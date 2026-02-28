import type { LessonContent } from "./lesson-content";

const lessons: Record<string, LessonContent> = {

  // \u2500\u2500 BEGINNER PROJECT 1 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l38: {
    id: "l38", title: "Project: Number Guessing Game", duration: "20m",
    intro: "Your first complete project: a fully playable number guessing game in the terminal. It uses loops, conditionals, random numbers, input validation, and scoring. You will build it step by step from scratch.",
    sections: [
      {
        heading: "What we are building",
        body: [
          "The game picks a secret random number between 1 and 100. The player keeps guessing until they find it. After each guess the game says Too High, Too Low, or Correct. At the end it shows how many guesses they used and rates their performance.",
          "Sounds simple -- but handling it correctly requires almost everything from the first half of the course: while loops, if/elif/else, functions, type conversion, input validation, f-strings, and the random module.",
          "We will build it in three stages: first the core game loop, then add input validation so bad input does not crash the game, then add difficulty levels and a scoring system.",
        ],
        code: {
          lang: "python", label: "stage 1 -- core game loop",
          code:
`import random

def play_game():
    secret   = random.randint(1, 100)
    attempts = 0
    max_att  = 10

    print("=" * 40)
    print("  NUMBER GUESSING GAME")
    print("  Guess a number between 1 and 100")
    print(f"  You have {max_att} attempts")
    print("=" * 40)

    while attempts < max_att:
        remaining = max_att - attempts
        guess_str = input(f"\\nGuess ({remaining} left): ")

        # Input validation
        if not guess_str.strip().isdigit():
            print("  Please enter a whole number.")
            continue

        guess = int(guess_str)

        if guess < 1 or guess > 100:
            print("  Number must be between 1 and 100.")
            continue

        attempts += 1

        if guess < secret:
            diff = secret - guess
            hint = "Very close!" if diff <= 5 else "Getting warmer..." if diff <= 15 else "Way too low!"
            print(f"  Too LOW!  {hint}")
        elif guess > secret:
            diff = guess - secret
            hint = "Very close!" if diff <= 5 else "Getting warmer..." if diff <= 15 else "Way too high!"
            print(f"  Too HIGH! {hint}")
        else:
            print(f"\\n  CORRECT! The number was {secret}")
            print(f"  You got it in {attempts} attempt(s)!")
            return attempts

    print(f"\\n  Game over! The number was {secret}")
    return None

play_game()`,
          output:
`========================================
  NUMBER GUESSING GAME
  Guess a number between 1 and 100
  You have 10 attempts
========================================

Guess (10 left): 50
  Too HIGH! Getting warmer...

Guess (9 left): 25
  Too LOW!  Way too low!

Guess (8 left): 38
  Too HIGH! Very close!

Guess (7 left): 35
  CORRECT! The number was 35
  You got it in 4 attempt(s)!`,
        },
      },
      {
        heading: "Adding difficulty levels",
        body: [
          "Now we add three difficulty levels: Easy (15 attempts, range 1-50), Medium (10 attempts, range 1-100), and Hard (6 attempts, range 1-200). A dictionary maps difficulty names to settings -- a clean alternative to a long if/elif chain.",
          "We also add a scoring system: the fewer guesses, the higher the score. The formula rewards efficiency without punishing legitimate exploration.",
        ],
        code: {
          lang: "python", label: "stage 2 -- difficulty and scoring",
          code:
`import random

DIFFICULTIES = {
    "easy":   {"range": (1, 50),  "attempts": 15, "label": "Easy"},
    "medium": {"range": (1, 100), "attempts": 10, "label": "Medium"},
    "hard":   {"range": (1, 200), "attempts": 6,  "label": "Hard"},
}

def calculate_score(attempts_used, max_attempts):
    if attempts_used is None:
        return 0
    # Score from 100 (one guess) down to 10 (last possible guess)
    ratio = 1 - (attempts_used - 1) / (max_attempts - 1)
    return max(10, int(ratio * 100))

def get_difficulty():
    print("\\nSelect difficulty:")
    for key, val in DIFFICULTIES.items():
        lo, hi = val["range"]
        print(f"  [{key[0]}] {val['label']:6}  Range 1-{hi}, {val['attempts']} attempts")

    while True:
        choice = input("Your choice (e/m/h): ").lower().strip()
        if choice in ("e", "easy"):
            return DIFFICULTIES["easy"]
        if choice in ("m", "medium"):
            return DIFFICULTIES["medium"]
        if choice in ("h", "hard"):
            return DIFFICULTIES["hard"]
        print("  Please enter e, m, or h.")

def play():
    config = get_difficulty()
    lo, hi = config["range"]
    secret = random.randint(lo, hi)
    max_att = config["attempts"]
    attempts = 0

    print(f"\\nGuess a number between {lo} and {hi}!")

    while attempts < max_att:
        raw = input(f"Guess ({max_att - attempts} left): ").strip()
        if not raw.isdigit():
            print("  Whole numbers only.")
            continue
        guess = int(raw)
        if not (lo <= guess <= hi):
            print(f"  Must be between {lo} and {hi}.")
            continue

        attempts += 1
        if guess < secret:
            print(f"  Too low! ({max_att - attempts} guesses left)")
        elif guess > secret:
            print(f"  Too high! ({max_att - attempts} guesses left)")
        else:
            score = calculate_score(attempts, max_att)
            print(f"\\n  Correct! Number was {secret}")
            print(f"  Guesses: {attempts} | Score: {score}/100")
            return

    print(f"  Out of guesses! The number was {secret}. Score: 0")

while True:
    play()
    again = input("\\nPlay again? (y/n): ").lower()
    if again != "y":
        print("Thanks for playing!")
        break`,
          output:
`Select difficulty:
  [e] Easy    Range 1-50, 15 attempts
  [m] Medium  Range 1-100, 10 attempts
  [h] Hard    Range 1-200, 6 attempts
Your choice (e/m/h): m

Guess a number between 1 and 100!
Guess (10 left): 50
  Too high! (9 guesses left)
Guess (9 left): 25
  Too low! (8 guesses left)
Guess (8 left): 37
  Correct! Number was 37
  Guesses: 3 | Score: 78/100`,
        },
        tip: "Using a dictionary to store difficulty settings (DIFFICULTIES) instead of multiple if/elif blocks is a pattern called a dispatch table. It scales cleanly to any number of options and is easy to extend.",
      },
      {
        heading: "Key concepts used in this project",
        body: [
          "Random module: random.randint(a, b) returns a random integer between a and b inclusive. Import it with import random.",
          "Input validation loop: the pattern while True: ... if valid: break is the standard way to keep asking until you get good input. continue skips back to the top when input is invalid.",
          "Dictionary as config: storing related settings in a dict (DIFFICULTIES) instead of scattered variables makes them easy to pass around, extend, and modify in one place.",
          "Score calculation: (1 - (used-1)/(max-1)) * 100 maps the range [1, max] to [100, 0]. The max(..., 10) ensures score never drops below 10 for successful completion.",
        ],
        code: {
          lang: "python", label: "concepts summary",
          code:
`import random

# Random numbers
print(random.randint(1, 100))    # e.g. 42
print(random.choice(["a","b","c"]))  # random list item
print(random.random())           # float 0.0 to 1.0

# Input validation pattern
while True:
    raw = input("Enter a number: ")
    if raw.isdigit():
        n = int(raw)
        break                    # exit loop on valid input
    print("Not a number, try again.")

# Dictionary config lookup
LEVELS = {"easy": 15, "hard": 6}
level  = "easy"
attempts = LEVELS[level]
print(f"{level} mode: {attempts} attempts")`,
          output:
`42
b
0.7234
Enter a number: hello
Not a number, try again.
Enter a number: 7
easy mode: 15 attempts`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does random.randint(1, 100) return?", options: ["A float between 0.0 and 1.0", "A random integer from 1 to 99", "A random integer from 1 to 100 inclusive", "Always 50"], answer: 2, explanation: "random.randint(a, b) returns a random integer N such that a <= N <= b. Both endpoints are included." },
      { type: "truefalse", q: "The 'continue' statement inside a while loop skips the rest of the current iteration and goes back to the condition check.", answer: true, explanation: "continue skips the remaining code in the current iteration and jumps back to the top of the loop. Perfect for input validation -- skip bad input, try again." },
      { type: "predict", q: "What prints?", code: `d = {"easy": 15, "hard": 6}\nprint(d["easy"])\nprint(d.get("medium", 10))`, answer: "15\n10", explanation: "d['easy'] returns 15. d.get('medium', 10) returns 10 as the default because 'medium' is not in the dict." },
      { type: "fillblank", q: "To get a random item from a list called options, use: random.________(options)", answer: "choice", hint: "The random module function that picks one item from a sequence" },
      { type: "mcq", q: "Why is input validation important in this game?", options: ["It is not important", "It prevents the program from crashing when the user types letters instead of numbers", "It makes the game harder", "Python requires it"], answer: 1, explanation: "int('hello') raises a ValueError and crashes. Validation checks input before converting so the program handles bad input gracefully." },
    ],
  },

  // \u2500\u2500 BEGINNER PROJECT 2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l39: {
    id: "l39", title: "Project: Personal Expense Tracker", duration: "22m",
    intro: "Build a real-world expense tracker that lets you log expenses, view summaries by category, see monthly totals, and save everything to a JSON file. This project covers OOP, file persistence, data analysis, and user interfaces.",
    sections: [
      {
        heading: "What we are building",
        body: [
          "The expense tracker will let you: add an expense (amount, category, description, date), list all expenses with filtering, show a summary grouped by category with totals and percentages, show monthly breakdown, and save/load data from JSON automatically.",
          "This is a more realistic project than the guessing game -- the kind of thing you might actually use or show in a portfolio. We use a class for the Expense model, a class for the Tracker (encapsulating all operations), and a simple text menu for the interface.",
          "The most interesting part is the data analysis: grouping expenses by category, calculating percentages, and finding patterns. This introduces you to the kind of data manipulation you would do with pandas in a data science project.",
        ],
        code: {
          lang: "python", label: "expense model and tracker class",
          code:
`from dataclasses import dataclass, field
from datetime import datetime
from collections import defaultdict
import json, uuid

@dataclass
class Expense:
    amount:      float
    category:    str
    description: str
    date:        str  = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))
    id:          str  = field(default_factory=lambda: str(uuid.uuid4())[:8])

    def to_dict(self):
        return {"id": self.id, "amount": self.amount,
                "category": self.category, "description": self.description,
                "date": self.date}

    @classmethod
    def from_dict(cls, d):
        return cls(amount=d["amount"], category=d["category"],
                   description=d["description"], date=d["date"], id=d["id"])

    def __str__(self):
        return f"[{self.date}] {self.category:12} {self.amount:7.2f}  {self.description}"


class ExpenseTracker:
    FILE = "expenses.json"
    CATEGORIES = ["Food", "Transport", "Housing", "Entertainment",
                  "Health", "Shopping", "Education", "Other"]

    def __init__(self):
        self.expenses = self._load()

    def _load(self):
        try:
            with open(self.FILE) as f:
                return [Expense.from_dict(d) for d in json.load(f)]
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def _save(self):
        with open(self.FILE, "w") as f:
            json.dump([e.to_dict() for e in self.expenses], f, indent=2)

    def add(self, amount, category, description):
        e = Expense(amount=amount, category=category, description=description)
        self.expenses.append(e)
        self._save()
        print(f"  Added: {e}")
        return e

    def total(self):
        return sum(e.amount for e in self.expenses)

    def by_category(self):
        groups = defaultdict(float)
        for e in self.expenses:
            groups[e.category] += e.amount
        return dict(sorted(groups.items(), key=lambda x: x[1], reverse=True))

    def summary(self):
        total = self.total()
        if total == 0:
            print("  No expenses yet.")
            return
        print(f"\\n  EXPENSE SUMMARY")
        print(f"  {'Category':15} {'Amount':>10}  {'Share':>7}")
        print("  " + "-" * 37)
        for cat, amt in self.by_category().items():
            pct = amt / total * 100
            bar = "#" * int(pct / 5)
            print(f"  {cat:15} {amt:9.2f}  {pct:6.1f}%  {bar}")
        print("  " + "-" * 37)
        print(f"  {'TOTAL':15} {total:9.2f}")`,
          output:
`  Added: [2024-01-15] Food         $  12.50  Lunch at cafe
  Added: [2024-01-15] Transport    $   3.20  Bus ticket
  Added: [2024-01-15] Food         $  45.00  Grocery shopping

  EXPENSE SUMMARY
  Category         Amount     Share
  -------------------------------------
  Food             $  57.50   93.5%  ###################
  Transport        $   3.20    5.2%  #
  -------------------------------------
  TOTAL            $  60.70`,
        },
      },
      {
        heading: "Monthly breakdown and the full menu",
        body: [
          "The monthly breakdown groups expenses by year-month and sorts them chronologically. We extract the year-month from the date string using string slicing -- dates are stored as 'YYYY-MM-DD' so date[:7] gives 'YYYY-MM'.",
          "The menu loop uses a dictionary to map user choices to functions -- the dispatch table pattern from the guessing game, now applied to a menu. This is much cleaner than a long if/elif chain.",
        ],
        code: {
          lang: "python", label: "monthly breakdown and menu",
          code:
`# Add to ExpenseTracker class:

    def monthly(self):
        months = defaultdict(float)
        for e in self.expenses:
            month = e.date[:7]   # "YYYY-MM"
            months[month] += e.amount
        print("\\n  MONTHLY BREAKDOWN")
        for month in sorted(months):
            amt = months[month]
            bar = "#" * min(30, int(amt / 10))
            print(f"  {month}  {amt:8.2f}  {bar}")

    def list_all(self, category=None):
        filtered = [e for e in self.expenses
                    if category is None or e.category.lower() == category.lower()]
        if not filtered:
            print("  No expenses found.")
            return
        print(f"\\n  {'Date':11} {'Category':12} {'Amount':>8}  Description")
        print("  " + "-" * 55)
        for e in sorted(filtered, key=lambda x: x.date):
            print(f"  {e.date}  {e.category:12} {e.amount:7.2f}  {e.description}")
        print(f"  Total: {sum(e.amount for e in filtered):.2f}")


# \u2500\u2500 Full menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
def main():
    tracker = ExpenseTracker()

    while True:
        print("\\n  EXPENSE TRACKER")
        print("  [1] Add expense")
        print("  [2] View all expenses")
        print("  [3] Category summary")
        print("  [4] Monthly breakdown")
        print("  [5] Quit")

        choice = input("\\n  Choice: ").strip()

        if choice == "1":
            print("\\n  Categories:", ", ".join(ExpenseTracker.CATEGORIES))
            try:
                amount = float(input("  Amount: $"))
            except ValueError:
                print("  Invalid amount.")
                continue
            category = input("  Category: ").strip().title()
            if category not in ExpenseTracker.CATEGORIES:
                category = "Other"
            desc = input("  Description: ").strip()
            tracker.add(amount, category, desc)

        elif choice == "2":
            cat = input("  Filter by category (or Enter for all): ").strip()
            tracker.list_all(cat or None)

        elif choice == "3":
            tracker.summary()

        elif choice == "4":
            tracker.monthly()

        elif choice == "5":
            print("  Goodbye!")
            break

main()`,
          output:
`  EXPENSE TRACKER
  [1] Add expense
  [2] View all expenses
  [3] Category summary
  [4] Monthly breakdown
  [5] Quit

  Choice: 3

  EXPENSE SUMMARY
  Category         Amount     Share
  -------------------------------------
  Housing          $ 800.00   67.2%  #############
  Food             $ 245.50   20.6%  ####
  Transport        $  89.00    7.5%  #
  Entertainment    $  56.00    4.7%  #
  -------------------------------------
  TOTAL            $1190.50`,
        },
        tip: "defaultdict(float) is perfect for accumulating totals by key. It automatically starts each new key at 0.0 so you can += without checking if the key exists first.",
      },
      {
        heading: "Key concepts in this project",
        body: [
          "Dataclasses with field(default_factory=...) generate unique IDs and timestamps automatically for each new instance without any extra code in __init__.",
          "defaultdict(float) for grouping and summing: iterating once over expenses and accumulating into a dict is O(n) and much cleaner than nested loops.",
          "Dispatch table (dict mapping strings to functions) scales to any number of menu options with zero if/elif chains. Adding a new menu option is just one line.",
          "Separation of concerns: the ExpenseTracker class handles data and logic. The main() function handles the user interface. They are cleanly separated -- you could swap the text menu for a web interface without touching ExpenseTracker.",
        ],
        code: {
          lang: "python", label: "dispatch table pattern",
          code:
`# Instead of this:
if choice == "1":
    add_expense()
elif choice == "2":
    view_all()
elif choice == "3":
    show_summary()

# Use a dispatch table -- clean and scalable:
actions = {
    "1": add_expense,
    "2": view_all,
    "3": show_summary,
}

if choice in actions:
    actions[choice]()   # call the function
else:
    print("Invalid choice")`,
        },
      },
    ],
    quiz: [
      { type: "predict", q: "What does date[:7] return when date is '2024-03-20'?", code: `date = "2024-03-20"\nprint(date[:7])`, answer: "2024-03", explanation: "String slicing [:7] takes the first 7 characters. '2024-03-20'[:7] = '2024-03' which is year-month." },
      { type: "mcq", q: "What does defaultdict(float) do when you access a key that does not exist?", options: ["Raises KeyError", "Returns None", "Automatically creates the key with value 0.0", "Returns 0 as int"], answer: 2, explanation: "defaultdict(float) creates a new key with the default value float() = 0.0 whenever a missing key is accessed. No KeyError, no manual initialization." },
      { type: "truefalse", q: "Storing expenses as @dataclass objects instead of plain dicts makes the code harder to read.", answer: false, explanation: "Dataclasses give you named attributes (e.amount, e.category) instead of dict lookups (e['amount']). The code is cleaner, has autocompletion support, and the class structure documents itself." },
      { type: "fillblank", q: "To sort a list of Expense objects by date, use: sorted(expenses, key=lambda e: e.______)", answer: "date", hint: "The attribute that stores when the expense was made" },
      { type: "mcq", q: "What is the advantage of the dispatch table pattern over if/elif?", options: ["It is faster", "Adding a new option is one line; the code scales without growing an if/elif chain", "Python requires it for menus", "It uses less memory"], answer: 1, explanation: "A dispatch table (dict of functions) means adding a new menu option is just adding one dict entry. A long if/elif chain grows linearly and becomes hard to maintain." },
    ],
  },

  // \u2500\u2500 INTERMEDIATE PROJECT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l40: {
    id: "l40", title: "Project: Student Grade Manager", duration: "25m",
    intro: "An intermediate project: a full student grade management system with multiple students, multiple subjects, grade statistics, a report card generator, and CSV export. This project exercises OOP inheritance, file formats, and real data analysis.",
    sections: [
      {
        heading: "System design",
        body: [
          "Before writing a single line of code, design the system. What data do we need? Students have a name and ID. Each student has grades for multiple subjects. A grade has a subject name, score, and weight (some assessments count more than others).",
          "What operations do we need? Add student, record grade, calculate GPA, find class average per subject, identify top/bottom students, generate a report card, export to CSV.",
          "We will use three classes: Grade (single assessment), Student (a person with a collection of grades), and GradeBook (manages all students and provides class-level analysis).",
        ],
        code: {
          lang: "python", label: "grade and student classes",
          code:
`from dataclasses import dataclass, field
from statistics import mean, stdev
import csv, json
from pathlib import Path

GRADE_SCALE = [
    (90, "A+"), (85, "A"), (80, "A-"),
    (75, "B+"), (70, "B"), (65, "B-"),
    (60, "C+"), (55, "C"), (50, "C-"),
    (0,  "F"),
]

def score_to_letter(score):
    for threshold, letter in GRADE_SCALE:
        if score >= threshold:
            return letter
    return "F"

@dataclass
class Grade:
    subject: str
    score:   float         # 0-100
    weight:  float = 1.0   # relative weight of this assessment
    note:    str   = ""

    @property
    def letter(self):
        return score_to_letter(self.score)

@dataclass
class Student:
    name:   str
    sid:    str
    grades: list = field(default_factory=list)

    def add_grade(self, subject, score, weight=1.0, note=""):
        self.grades.append(Grade(subject, score, weight, note))

    def subject_average(self, subject):
        relevant = [g for g in self.grades if g.subject == subject]
        if not relevant:
            return None
        total_weight = sum(g.weight for g in relevant)
        weighted_sum = sum(g.score * g.weight for g in relevant)
        return weighted_sum / total_weight

    def gpa(self):
        if not self.grades:
            return 0.0
        subjects = set(g.subject for g in self.grades)
        avgs = [self.subject_average(s) for s in subjects]
        return mean(avgs)

    def report_card(self):
        print(f"\\n  REPORT CARD -- {self.name} ({self.sid})")
        print("  " + "=" * 45)
        subjects = sorted(set(g.subject for g in self.grades))
        for subj in subjects:
            avg    = self.subject_average(subj)
            letter = score_to_letter(avg)
            grades = [g for g in self.grades if g.subject == subj]
            scores = ", ".join(f"{g.score:.0f}" for g in grades)
            print(f"  {subj:15} {avg:5.1f}  {letter:3}  [{scores}]")
        print("  " + "-" * 45)
        gpa = self.gpa()
        print(f"  GPA: {gpa:.1f}  Overall: {score_to_letter(gpa)}")`,
          output:
`  REPORT CARD -- Alice Johnson (S001)
  =============================================
  Mathematics      88.3  A-  [92, 85, 88]
  Physics          79.7  B+  [82, 76, 81]
  English          91.0  A+  [89, 93]
  History          74.5  B+  [78, 71]
  ---------------------------------------------
  GPA: 83.4  Overall: A-`,
        },
      },
      {
        heading: "GradeBook -- class-level analysis and CSV export",
        body: [
          "GradeBook manages all students and provides class-level statistics. The most interesting method is class_report() which calculates mean and standard deviation for each subject across all students.",
          "Standard deviation tells you how spread out the grades are. A small stddev means everyone scored similarly. A large stddev means there is a big gap between top and bottom students -- useful information for a teacher.",
          "CSV export is valuable because teachers may want to open data in Excel or Google Sheets. Python's csv module handles the quoting and escaping automatically.",
        ],
        code: {
          lang: "python", label: "gradebook and analysis",
          code:
`class GradeBook:
    def __init__(self, name="Class"):
        self.name     = name
        self.students = {}

    def add_student(self, name, sid):
        self.students[sid] = Student(name, sid)
        return self.students[sid]

    def get_student(self, sid):
        return self.students.get(sid)

    def all_subjects(self):
        subjects = set()
        for s in self.students.values():
            for g in s.grades:
                subjects.add(g.subject)
        return sorted(subjects)

    def class_report(self):
        print(f"\\n  CLASS REPORT -- {self.name}")
        print(f"  Students: {len(self.students)}")
        print("  " + "=" * 50)
        print(f"  {'Subject':15} {'Mean':>6} {'StDev':>6} {'High':>5} {'Low':>5}")
        print("  " + "-" * 50)

        for subj in self.all_subjects():
            scores = []
            for s in self.students.values():
                avg = s.subject_average(subj)
                if avg is not None:
                    scores.append(avg)
            if not scores:
                continue
            avg_score = mean(scores)
            sd        = stdev(scores) if len(scores) > 1 else 0
            print(f"  {subj:15} {avg_score:6.1f} {sd:6.1f} {max(scores):5.1f} {min(scores):5.1f}")

    def top_students(self, n=3):
        ranked = sorted(self.students.values(),
                        key=lambda s: s.gpa(), reverse=True)
        print(f"\\n  TOP {n} STUDENTS:")
        for i, s in enumerate(ranked[:n], 1):
            print(f"  {i}. {s.name:20} GPA: {s.gpa():.1f}  {score_to_letter(s.gpa())}")

    def export_csv(self, filename="grades.csv"):
        subjects = self.all_subjects()
        with open(filename, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["Student", "ID"] + subjects + ["GPA", "Grade"])
            for s in self.students.values():
                row = [s.name, s.sid]
                for subj in subjects:
                    avg = s.subject_average(subj)
                    row.append(f"{avg:.1f}" if avg is not None else "N/A")
                row.extend([f"{s.gpa():.1f}", score_to_letter(s.gpa())])
                writer.writerow(row)
        print(f"  Exported to {filename}")


# \u2500\u2500 Demo \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
gb = GradeBook("Python 101")

alice = gb.add_student("Alice Johnson", "S001")
bob   = gb.add_student("Bob Smith",    "S002")
carol = gb.add_student("Carol White",  "S003")

for name, sid, maths, phys, eng in [
    ("Alice Johnson", "S001", [92,85,88], [82,76,81], [89,93]),
    ("Bob Smith",     "S002", [65,70,68], [55,60,58], [72,75]),
    ("Carol White",   "S003", [88,91,94], [90,85,88], [95,92]),
]:
    s = gb.get_student(sid)
    for score in maths: s.add_grade("Mathematics", score)
    for score in phys:  s.add_grade("Physics",     score)
    for score in eng:   s.add_grade("English",     score)

gb.class_report()
gb.top_students()
alice_s = gb.get_student("S001")
alice_s.report_card()
gb.export_csv()`,
          output:
`  CLASS REPORT -- Python 101
  Students: 3
  ==================================================
  Subject          Mean  StDev  High   Low
  --------------------------------------------------
  English          86.3    9.2  93.5  73.5
  Mathematics      84.3   11.8  91.0  67.7
  Physics          74.5   14.0  87.7  57.7

  TOP 3 STUDENTS:
  1. Carol White           GPA: 91.3  A+
  2. Alice Johnson         GPA: 83.8  A-
  3. Bob Smith             GPA: 65.5  C+

  REPORT CARD -- Alice Johnson (S001)
  =============================================
  English          90.3  A+  [89, 93]
  Mathematics      88.3  A-  [92, 85, 88]
  Physics          79.7  B+  [82, 76, 81]
  ---------------------------------------------
  GPA: 83.8  Overall: A-
  Exported to grades.csv`,
        },
        tip: "from statistics import mean, stdev gives you professional statistical functions. Python's statistics module also has median, variance, and more -- no need to implement them from scratch.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does a property decorator do in a Python class?", options: ["Makes an attribute private", "Lets you call a method as if it were an attribute (no parentheses)", "Makes a class attribute", "Caches the result"], answer: 1, explanation: "@property lets you define a method that is accessed like an attribute. grade.letter instead of grade.letter(). Good for computed values that depend on other attributes." },
      { type: "truefalse", q: "Standard deviation (stdev) tells you how spread out values are from the mean.", answer: true, explanation: "A small stddev means values cluster around the mean. A large stddev means values are spread far from the mean. Essential for understanding score distribution." },
      { type: "predict", q: "What does this weighted average calculate?", code: `grades = [(90, 0.4), (80, 0.6)]\ntotal = sum(s*w for s,w in grades)\nweight = sum(w for _,w in grades)\nprint(total/weight)`, answer: "84.0", explanation: "90*0.4=36, 80*0.6=48. Total=84. Weight=1.0. Result=84.0. The 80% weight of the second grade pulls the average down from a straight 85." },
      { type: "fillblank", q: "Python's csv module writer is created with: csv.________(file_object)", answer: "writer", hint: "The csv function that creates a writer object" },
      { type: "mcq", q: "Why use a dictionary (self.students = {}) instead of a list for storing students?", options: ["Dicts are faster always", "Lookup by student ID is O(1) with dict vs O(n) with list", "Lists cannot store objects", "Python requires dicts for class data"], answer: 1, explanation: "students[sid] is instant O(1) lookup. Finding a student by ID in a list requires scanning the whole list O(n). For large classes this makes a real difference." },
    ],
  },

  // \u2500\u2500 ADVANCED PROJECT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l41: {
    id: "l41", title: "Project: Web Scraper and Data Analyser", duration: "30m",
    intro: "The advanced project: build a real web scraper that fetches live data, cleans and analyses it, generates statistics, and saves results in multiple formats. This uses third-party libraries, OOP, error handling, generators, and everything else from the course.",
    sections: [
      {
        heading: "Setup -- installing the required libraries",
        body: [
          "This project uses two third-party libraries: requests (for making HTTP requests to fetch web pages) and beautifulsoup4 (for parsing HTML and extracting data). Install them in a virtual environment.",
          "We will scrape books.toscrape.com -- a website specifically designed for scraping practice with no legal issues. It contains 1000 books with titles, prices, ratings, and availability.",
          "Always respect robots.txt and terms of service when scraping real sites. books.toscrape.com is explicitly built for scraping practice.",
        ],
        code: {
          lang: "bash", label: "setup",
          code:
`# Create and activate virtual environment
python -m venv venv

# Windows:
venv\\Scripts\\activate
# Mac/Linux:
source venv/bin/activate

# Install required libraries
pip install requests beautifulsoup4

# Verify
python -c "import requests, bs4; print('All libraries installed!')"`,
          output: `All libraries installed!`,
        },
      },
      {
        heading: "The scraper -- fetching and parsing data",
        body: [
          "requests.get(url) fetches a web page and returns a Response object. response.text contains the HTML as a string. BeautifulSoup parses that HTML into a tree you can navigate with CSS selectors.",
          "We scrape multiple pages using a generator -- this is memory efficient and lets us process books as they come in rather than loading all 1000 into memory first.",
          "Good scraping practice: add a delay between requests (time.sleep) so you do not overload the server, handle connection errors gracefully, and use a session object for connection reuse.",
        ],
        code: {
          lang: "python", label: "scraper.py",
          code:
`import requests
import time
from bs4 import BeautifulSoup
from dataclasses import dataclass
from typing import Generator

BASE_URL = "https://books.toscrape.com/catalogue"

RATING_MAP = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5}

@dataclass
class Book:
    title:       str
    price:       float
    rating:      int       # 1-5
    available:   bool
    category:    str = "Unknown"

    def __str__(self):
        stars   = "*" * self.rating
        status  = "In Stock" if self.available else "Out of Stock"
        return f"{self.title[:40]:40} {stars:5} {self.price:.2f}  {status}"


def parse_price(price_str: str) -> float:
    # price_str looks like "Ps11.23" -- strip currency symbol
    return float(price_str.replace("Ps", "").strip())


def scrape_page(session, page_num: int) -> list[Book]:
    url = f"{BASE_URL}/page-{page_num}.html"
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  Error fetching page {page_num}: {e}")
        return []

    soup  = BeautifulSoup(response.text, "html.parser")
    books = []

    for article in soup.select("article.product_pod"):
        title   = article.h3.a["title"]
        price   = parse_price(article.select_one("p.price_color").text)
        rating  = RATING_MAP.get(article.p["class"][1], 0)
        in_stock = "In stock" in article.select_one("p.availability").text

        books.append(Book(title, price, rating, in_stock))

    return books


def scrape_all(max_pages: int = 5) -> Generator[Book, None, None]:
    session = requests.Session()
    session.headers["User-Agent"] = "BookScraper/1.0 (educational project)"

    for page in range(1, max_pages + 1):
        print(f"  Scraping page {page}/{max_pages}...")
        books = scrape_page(session, page)
        for book in books:
            yield book
        time.sleep(0.5)   # be polite to the server`,
          output:
`  Scraping page 1/5...
  Scraping page 2/5...
  Scraping page 3/5...
  Scraping page 4/5...
  Scraping page 5/5...`,
        },
      },
      {
        heading: "The analyser -- statistics and reporting",
        body: [
          "Once we have the scraped data, we analyse it. We find average price by rating (do better-rated books cost more?), the price distribution, and which price ranges have the most books.",
          "The analysis is done with plain Python using defaultdict and the statistics module -- no pandas needed for this scale. The output includes both a text report and CSV/JSON export.",
        ],
        code: {
          lang: "python", label: "analyser.py",
          code:
`from collections import defaultdict
from statistics import mean, median
import json, csv

def analyse(books: list):
    if not books:
        print("No books to analyse.")
        return

    total = len(books)
    prices  = [b.price for b in books]
    ratings = [b.rating for b in books]

    print(f"\\n  BOOK ANALYSIS -- {total} books")
    print("  " + "=" * 50)
    print(f"  Price range:    {min(prices):.2f} -- {max(prices):.2f}")
    print(f"  Average price:  {mean(prices):.2f}")
    print(f"  Median price:   {median(prices):.2f}")
    print(f"  Avg rating:     {mean(ratings):.1f} / 5.0")
    in_stock = sum(1 for b in books if b.available)
    print(f"  In stock:       {in_stock}/{total} ({in_stock/total*100:.0f}%)")

    # Average price by rating
    by_rating = defaultdict(list)
    for b in books:
        by_rating[b.rating].append(b.price)

    print("\\n  Average Price by Rating:")
    for stars in range(5, 0, -1):
        if stars in by_rating:
            avg = mean(by_rating[stars])
            count = len(by_rating[stars])
            bar = "#" * int(avg / 2)
            print(f"  {'*'*stars:5}  {avg:5.2f}  ({count:3} books)  {bar}")

    # Price buckets
    buckets = defaultdict(int)
    for price in prices:
        bucket = f"\${int(price/10)*10}-\${int(price/10)*10+10}"
        buckets[bucket] += 1

    print("\\n  Price Distribution:")
    for bucket in sorted(buckets, key=lambda x: int(x[1:].split("-")[0])):
        count = buckets[bucket]
        bar   = "#" * count
        print(f"  {bucket:10}  {count:3}  {bar}")

    # Top 5 cheapest 5-star books
    five_star = sorted(
        [b for b in books if b.rating == 5],
        key=lambda b: b.price
    )[:5]
    print("\\n  Top 5 Cheapest 5-Star Books:")
    for i, b in enumerate(five_star, 1):
        print(f"  {i}. {b.price:.2f}  {b.title[:45]}")


def export(books, json_file="books.json", csv_file="books.csv"):
    # JSON export
    with open(json_file, "w") as f:
        json.dump([{"title":b.title,"price":b.price,"rating":b.rating,
                    "available":b.available} for b in books], f, indent=2)

    # CSV export
    with open(csv_file, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["title","price","rating","available"])
        w.writeheader()
        for b in books:
            w.writerow({"title":b.title,"price":b.price,
                        "rating":b.rating,"available":b.available})

    print(f"  Saved {len(books)} books to {json_file} and {csv_file}")


# \u2500\u2500 Main script \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
from scraper import scrape_all

print("Starting scrape...")
books = list(scrape_all(max_pages=5))   # collect all into a list
print(f"Scraped {len(books)} books")

analyse(books)
export(books)`,
          output:
`Starting scrape...
  Scraping page 1/5...
  Scraping page 2/5...
Scraped 100 books

  BOOK ANALYSIS -- 100 books
  ==================================================
  Price range:    $10.00 -- $59.99
  Average price:  $35.08
  Median price:   $35.40
  Avg rating:     3.0 / 5.0
  In stock:       83/100 (83%)

  Average Price by Rating:
  *****  $38.43  ( 21 books)  ###################
  ****   $33.21  ( 19 books)  ################
  ***    $34.89  ( 20 books)  #################
  **     $34.72  ( 22 books)  #################
  *      $33.86  ( 18 books)  ################

  Top 5 Cheapest 5-Star Books:
  1. $10.00  Starving Hearts (Triangular Trade Trilogy, #1)
  2. $13.76  Soumission
  3. $14.46  The Four Hour Workweek
  4. $15.65  Tipping the Velvet
  5. $17.39  The Secret Garden`,
        },
        tip: "books.toscrape.com is safe to scrape for learning. For real sites always check the robots.txt file (site.com/robots.txt) and terms of service before scraping. Many sites prohibit automated access.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does response.raise_for_status() do?", options: ["Prints the status code", "Raises an exception if the HTTP response was an error (4xx or 5xx)", "Returns the page HTML", "Closes the connection"], answer: 1, explanation: "raise_for_status() raises a requests.HTTPError if the response code indicates failure (404, 500, etc.). Without it you would need to manually check response.status_code." },
      { type: "truefalse", q: "Using a generator (yield) in scrape_all() means all pages are fetched before any book is processed.", answer: false, explanation: "Generators are lazy. Each book is yielded (available to the caller) as soon as its page is fetched. The caller can start processing immediately without waiting for all pages." },
      { type: "predict", q: "What does this extract from the price string?", code: `price_str = "Ps12.99"\nresult = float(price_str.replace("Ps", "").strip())\nprint(result)`, answer: "12.99", explanation: "replace('Ps', '') removes the currency symbol. strip() removes whitespace. float() converts to a number." },
      { type: "fillblank", q: "time.________(0.5) pauses execution for half a second between requests.", answer: "sleep", hint: "The time module function that pauses execution" },
      { type: "mcq", q: "Why add a delay (time.sleep) between scraping requests?", options: ["Python requires it", "To avoid overwhelming the server and getting your IP blocked", "To make the code run correctly", "To save memory"], answer: 1, explanation: "Rapid repeated requests can overload a server or trigger rate limiting and IP blocking. A small delay (0.5-1s) is polite and keeps your scraper from being flagged." },
    ],
  },

};

export function getLessonContent6(id: string): LessonContent | undefined {
  return lessons[id];
}