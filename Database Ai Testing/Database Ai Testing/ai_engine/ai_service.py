"""
Smart Campus Complaint Management System
MEMBER 3: AI DEVELOPMENT ENGINE
-----------------------------------------
Features:
1. Automatic Categorization: Identifies complaint category from natural text.
2. Priority Detection: Evaluates hazard/urgency signals to suggest ticket priority.
3. Complaint Analytics: Detects recurring problem hotspots, top categories, and bottlenecks.
"""

import re
from collections import Counter
from typing import Dict, List, Tuple


class AutomaticCategorizer:
    """Feature 1: Classifies complaints into designated campus categories."""

    CATEGORY_KEYWORDS = {
        "CLASSROOM": [
            "projector", "hdmi", "screen", "podium", "mic", "microphone",
            "speaker", "whiteboard", "blackboard", "bench", "desk", "chair",
            "audio", "chalk", "duster", "lecture hall", "smart board"
        ],
        "WIFI": [
            "wifi", "wi-fi", "internet", "network", "bandwidth", "disconnect",
            "router", "signal", "slow net", "lan", "ethernet", "login portal",
            "access point", "packet loss", "ping"
        ],
        "ELECTRICITY": [
            "power", "electricity", "switch", "socket", "light", "tube light",
            "bulb", "fan", "ac", "air conditioner", "cooling", "wire", "wiring",
            "spark", "sparking", "shock", "voltage", "mcb", "fuse", "outage"
        ],
        "WATER": [
            "water", "cooler", "drinking water", "tap", "pipe", "leak", "leaking",
            "plumbing", "drainage", "sink", "washbasin", "water overflow", "filter",
            "aquaguard", "purifier", "flush"
        ],
        "CLEANLINESS": [
            "clean", "dirty", "dustbin", "trash", "garbage", "waste", "smell",
            "odor", "washroom", "toilet", "restroom", "stain", "sweep", "mop",
            "hygiene", "litter"
        ],
        "HOSTEL": [
            "hostel", "room", "warden", "mess", "food", "laundry", "geyser",
            "hot water", "bed", "cupboard", "almirah", "curfew", "dormitory"
        ]
    }

    @classmethod
    def predict_category(cls, text: str) -> Tuple[str, float]:
        """Returns the best matching category and a confidence score between 0 and 1."""
        clean_text = text.lower()
        scores = {}

        for category, keywords in cls.CATEGORY_KEYWORDS.items():
            match_count = sum(1 for kw in keywords if re.search(r'\b' + re.escape(kw) + r'\b', clean_text))
            scores[category] = match_count

        best_category, highest_score = max(scores.items(), key=lambda item: item[1])
        if highest_score == 0:
            return "OTHER", 0.50

        confidence = min(0.60 + (highest_score * 0.15), 0.98)
        return best_category, round(confidence, 2)


class PriorityDetector:
    """Feature 2: Evaluates text for safety hazards, scale of impact, and urgency."""

    URGENT_SIGNALS = [
        "spark", "sparking", "fire", "danger", "smoke", "electric shock",
        "hazard", "burst", "flood", "short circuit", "burning smell", "emergency"
    ]

    HIGH_SIGNALS = [
        "exam", "tomorrow", "leaking heavily", "completely dark", "unusable",
        "entire class", "all students", "test", "urgent", "no water", "blackout"
    ]

    LOW_SIGNALS = [
        "minor", "wrapper", "dust", "slightly", "squeak", "loose knob",
        "notice board", "cosmetic"
    ]

    @classmethod
    def detect_priority(cls, text: str) -> Tuple[str, str]:
        """Returns priority (LOW, MEDIUM, HIGH, URGENT) and the reasoning."""
        clean_text = text.lower()

        # Check for URGENT safety or fire hazards
        for signal in cls.URGENT_SIGNALS:
            if signal in clean_text:
                return "URGENT", f"Critical safety or infrastructure risk identified ('{signal}')."

        # Check for HIGH operational or academic urgency
        for signal in cls.HIGH_SIGNALS:
            if signal in clean_text:
                return "HIGH", f"High urgency academic or campus disruption ('{signal}')."

        # Check for LOW priority
        for signal in cls.LOW_SIGNALS:
            if signal in clean_text:
                return "LOW", f"Minor non-blocking issue ('{signal}')."

        return "MEDIUM", "Standard priority grievance with standard SLA."


class ComplaintAnalytics:
    """Feature 3: Analytics engine to spot recurrent campus problem clusters and hotspots."""

    @staticmethod
    def analyze_complaints(complaints_data: List[Dict]) -> Dict:
        if not complaints_data:
            return {"status": "No data available"}

        total = len(complaints_data)
        categories = Counter(c.get("category") for c in complaints_data)
        locations = Counter(c.get("location") for c in complaints_data)
        priorities = Counter(c.get("priority") for c in complaints_data)
        statuses = Counter(c.get("status") for c in complaints_data)

        # Identify problem hotspots (areas with > 1 complaint)
        hotspots = [{"location": loc, "complaint_count": count} for loc, count in locations.most_common(5)]

        # Top category breakdown
        category_breakdown = {cat: f"{round((cnt / total) * 100, 1)}%" for cat, cnt in categories.most_common()}

        # Bottleneck detection
        pending_count = statuses.get("PENDING", 0)
        bottleneck_alert = pending_count > (total * 0.4)

        return {
            "total_complaints_analyzed": total,
            "status_distribution": dict(statuses),
            "priority_breakdown": dict(priorities),
            "top_problem_categories": category_breakdown,
            "top_problem_hotspots": hotspots,
            "insights": [
                f"Most reported category: {categories.most_common(1)[0][0]} ({categories.most_common(1)[0][1]} tickets)",
                f"Primary hotspot: {hotspots[0]['location'] if hotspots else 'N/A'}",
                "Bottleneck warning: High volume of unresolved complaints!" if bottleneck_alert else "Resolution workflow operating within acceptable queue limits."
            ]
        }
