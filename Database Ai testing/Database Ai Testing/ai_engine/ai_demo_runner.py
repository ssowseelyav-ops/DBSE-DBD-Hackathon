"""
Interactive Demo Runner for Member 3 AI Features:
1. Automatic Categorization
2. Priority Detection
3. Complaint Analytics
"""

import json
import sys

# Ensure UTF-8 output on Windows terminals
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from ai_service import AutomaticCategorizer, PriorityDetector, ComplaintAnalytics

TEST_STUDENT_COMPLAINTS = [
    {
        "title": "Loose electrical switch causing sparks",
        "description": "The socket in Computer Lab 2 produces visible sparks when plugging charging adapters. Risk of shock.",
        "location": "IT Block, Lab 2"
    },
    {
        "title": "Wi-Fi is completely down before exam",
        "description": "Internet bandwidth has dropped to zero in the Central Library. We have an online test tomorrow.",
        "location": "Central Library, 2nd Floor"
    },
    {
        "title": "Water cooler leaking all over hallway",
        "description": "The drinking water tap won't shut completely and is continuously leaking onto the floor.",
        "location": "Block C, 3rd Floor Corridor"
    },
    {
        "title": "Smart board HDMI cable broken",
        "description": "The projector in Room 204 does not display video input from lecturer laptop.",
        "location": "Block A, Room 204"
    },
    {
        "title": "Waste container full",
        "description": "Minor issue: paper wrappers and plastic cups are overflowing slightly from the dustbin.",
        "location": "Canteen Area"
    }
]

def main():
    print("=" * 70)
    print("🤖 SMART CAMPUS AI INTELLIGENCE ENGINE (MEMBER 3)")
    print("=" * 70)

    analyzed_complaints = []

    print("\n--- FEATURE 1 & 2: LIVE PREDICTION ON STUDENT COMPLAINTS ---\n")
    for idx, c in enumerate(TEST_STUDENT_COMPLAINTS, 1):
        full_text = f"{c['title']} {c['description']}"
        predicted_cat, conf = AutomaticCategorizer.predict_category(full_text)
        detected_prio, reason = PriorityDetector.detect_priority(full_text)

        print(f"[{idx}] Title: {c['title']}")
        print(f"    Location: {c['location']}")
        print(f"    🧠 AI Category: {predicted_cat} (Confidence: {conf * 100:.0f}%)")
        print(f"    ⚡ AI Priority: {detected_prio} ({reason})")
        print("-" * 70)

        analyzed_complaints.append({
            "category": predicted_cat,
            "priority": detected_prio,
            "location": c["location"],
            "status": "PENDING"
        })

    print("\n--- FEATURE 3: COMPLAINT ANALYTICS & HOTSPOT DETECTION ---\n")
    analytics_report = ComplaintAnalytics.analyze_complaints(analyzed_complaints)
    print(json.dumps(analytics_report, indent=2))
    print("=" * 70)
    print("✅ All AI tests executed successfully!")

if __name__ == "__main__":
    main()
