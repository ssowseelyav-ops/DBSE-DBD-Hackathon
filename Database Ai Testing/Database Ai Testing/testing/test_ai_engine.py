import unittest
import sys
import os

# Include ai_engine in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ai_engine')))

from ai_service import AutomaticCategorizer, PriorityDetector, ComplaintAnalytics


class TestAIEngine(unittest.TestCase):

    def test_automatic_categorization(self):
        cases = [
            ("Projector bulb exploded during class lecture", "CLASSROOM"),
            ("Wi-Fi router drops packets and network is slow", "WIFI"),
            ("Air conditioner in computer lab stopped cooling", "ELECTRICITY"),
            ("Water dispenser pipe leaking in 3rd floor washroom", "WATER"),
            ("Dustbin overflow in canteen area", "CLEANLINESS"),
            ("Hostel room geyser is not providing hot water", "HOSTEL")
        ]
        for text, expected_cat in cases:
            with self.subTest(text=text):
                cat, conf = AutomaticCategorizer.predict_category(text)
                self.assertEqual(cat, expected_cat)
                self.assertGreaterEqual(conf, 0.60)

    def test_priority_detection(self):
        cases = [
            ("Live wire sparking near doorway danger of shock", "URGENT"),
            ("Internet disconnected before online exam tomorrow", "HIGH"),
            ("Minor cosmetic scratch on notice board desk", "LOW"),
            ("Projector display color is washed out during lectures", "MEDIUM")
        ]
        for text, expected_prio in cases:
            with self.subTest(text=text):
                prio, _ = PriorityDetector.detect_priority(text)
                self.assertEqual(prio, expected_prio)

    def test_complaint_analytics(self):
        sample = [
            {"category": "WIFI", "priority": "HIGH", "location": "Library", "status": "PENDING"},
            {"category": "WIFI", "priority": "HIGH", "location": "Library", "status": "RESOLVED"},
            {"category": "ELECTRICITY", "priority": "URGENT", "location": "Lab 1", "status": "PENDING"}
        ]
        report = ComplaintAnalytics.analyze_complaints(sample)
        self.assertEqual(report["total_complaints_analyzed"], 3)
        self.assertEqual(report["top_problem_hotspots"][0]["location"], "Library")
        self.assertEqual(report["top_problem_hotspots"][0]["complaint_count"], 2)


if __name__ == "__main__":
    unittest.main()
