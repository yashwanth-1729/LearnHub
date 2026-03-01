import type { LessonContent } from "./lesson-content";

const lessons: Record<string, LessonContent> = {

  // \u2500\u2500 l21-l25: remaining data structures \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l21: {
    id: "l21", title: "String Methods Deep Dive", duration: "11m",
    intro: "Strings are everywhere in Python programs. Knowing every string method saves you from writing loops to do things Python already does natively. This lesson covers every method you will actually use day to day.",
    sections: [
      {
        heading: "Finding and checking",
        body: [
          "Python strings have methods for searching, testing, and validating content. These return True/False or positions, and they are much cleaner than writing custom loops.",
          "The find() method returns the index of the first match, or -1 if not found. The in operator is usually cleaner for simple existence checks. count() counts non-overlapping occurrences.",
        ],
        code: {
          lang: "python", label: "finding and checking",
          code:
`text = "Hello, Python World!"

# Finding
print(text.find("Python"))      # 7  (index of first char)
print(text.find("Java"))        # -1 (not found)
print(text.index("World"))      # 14 (raises ValueError if not found)
print("Python" in text)         # True
print(text.count("l"))          # 3
print(text.startswith("Hello")) # True
print(text.endswith("!"))       # True

# Case checks
print("hello123".isalpha())     # False (has digits)
print("hello".isalpha())        # True
print("123".isdigit())          # True
print("hello123".isalnum())     # True
print("  ".isspace())           # True
print("Hello World".istitle())  # True
print("UPPER".isupper())        # True
print("lower".islower())        # True`,
          output:
`7
-1
14
True
3
True
True
False
True
True
True
True
True
True`,
        },
      },
      {
        heading: "Transforming and cleaning",
        body: [
          "String transformation methods return new strings -- strings are immutable so nothing is modified in place. Always assign the result: clean = text.strip() not text.strip().",
          "strip(), lstrip(), rstrip() remove whitespace (or specific characters) from ends. replace() swaps substrings. split() breaks into a list. join() assembles a list back into a string.",
        ],
        code: {
          lang: "python", label: "transforming strings",
          code:
`# Case transforms
s = "hello WORLD Python"
print(s.upper())        # HELLO WORLD PYTHON
print(s.lower())        # hello world python
print(s.title())        # Hello World Python
print(s.capitalize())   # Hello world python
print(s.swapcase())     # HELLO world pYTHON

# Stripping whitespace
messy = "   lots of spaces   "
print(repr(messy.strip()))    # 'lots of spaces'
print(repr(messy.lstrip()))   # 'lots of spaces   '
print(repr(messy.rstrip()))   # '   lots of spaces'

# Strip specific characters
url = "https://example.com/"
print(url.strip("/"))         # https://example.com
csv_val = '"Alice"'
print(csv_val.strip('"'))     # Alice

# Replace
text = "I like cats. Cats are cool. My cat is grey."
print(text.replace("cat", "dog"))        # replaces ALL
print(text.replace("cat", "dog", 1))     # replaces only first

# Split and join
sentence = "one,two,three,four"
words = sentence.split(",")
print(words)                              # ['one', 'two', 'three', 'four']
print(" - ".join(words))                  # one - two - three - four

# Split on whitespace (default) -- also strips extra spaces
messy_line = "  hello   world   python  "
print(messy_line.split())                 # ['hello', 'world', 'python']`,
          output:
`HELLO WORLD PYTHON
hello world python
Hello World Python
Hello world python
HELLO world pYTHON
'lots of spaces'
'lots of spaces   '
'   lots of spaces'
https://example.com
Alice
I like dogs. dogs are cool. My dog is grey.
I like dogs. Cats are cool. My cat is grey.
['one', 'two', 'three', 'four']
one - two - three - four
['hello', 'world', 'python']`,
        },
        tip: "','.join(list) is the correct way to join a list into a string. Never use a loop to build strings by concatenation -- each += creates a new string object. join() does it in one efficient operation.",
      },
      {
        heading: "Formatting and alignment",
        body: [
          "F-strings are the modern way to embed variables in strings (Python 3.6+). They support format specs after a colon: width, alignment, decimal places, thousands separators, and more.",
          "zfill() pads with leading zeros. center(), ljust(), rjust() align text in a fixed-width field. These are useful for building tables and reports without importing anything.",
        ],
        code: {
          lang: "python", label: "formatting strings",
          code:
`# f-string format specs
pi     = 3.14159265
big    = 1234567.89
name   = "Alice"

print(f"{pi:.2f}")           # 3.14 -- 2 decimal places
print(f"{pi:.5f}")           # 3.14159
print(f"{big:,.2f}")         # 1,234,567.89 -- thousands separator
print(f"{big:>15,.2f}")      # right-align in 15 chars
print(f"{name:^20}")         # center in 20 chars
print(f"{name:<20}|")        # left-align
print(f"{42:05d}")           # 00042 -- zero-pad to 5 digits
print(f"{255:#x}")           # 0xff -- hex with prefix
print(f"{0.756:.1%}")        # 75.6% -- percentage

# Building a table
data = [("Alice", 95, 1250.50), ("Bob", 72, 980.00), ("Carol", 88, 1100.75)]
print(f"{'Name':<10} {'Score':>6} {'Salary':>10}")
print("-" * 30)
for name, score, salary in data:
    print(f"{name:<10} {score:>6} {salary:>10,.2f}")`,
          output:
`3.14
3.14159
1,234,567.89
     1,234,567.89
        Alice       
Alice               |
00042
0xff
75.6%
Name        Score     Salary
------------------------------
Alice          95   1,250.50
Bob            72     980.00
Carol          88   1,100.75`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does 'hello world'.split() return?", options: ["['hello world']", "['h','e','l','l','o',' ','w','o','r','l','d']", "['hello', 'world']", "('hello', 'world')"], answer: 2, explanation: "split() with no argument splits on any whitespace and removes empty strings. Returns a list of words." },
      { type: "truefalse", q: "'  hello  '.strip() modifies the original string.", answer: false, explanation: "Strings are immutable. strip() returns a NEW string. The original is unchanged. Always assign: clean = s.strip()." },
      { type: "predict", q: "What prints?", code: `words = ["one", "two", "three"]\nprint("-".join(words))`, answer: "one-two-three", explanation: "join() places the separator between each item. '-'.join(['one','two','three']) = 'one-two-three'." },
      { type: "fillblank", q: "To format a float to 2 decimal places in an f-string: f'{value:______}'", answer: ".2f", hint: "Dot, number of decimals, f for float" },
      { type: "mcq", q: "What does 'cats cats cats'.count('cats') return?", options: ["1", "2", "3", "4"], answer: 2, explanation: "count() returns the number of non-overlapping occurrences of the substring. 'cats' appears 3 times." },
    ],
  },

  l22: {
    id: "l22", title: "List Methods and Sorting", duration: "10m",
    intro: "Lists have a rich set of methods for adding, removing, searching, and sorting. Python's sorting is world-class -- Timsort is used in Java, JavaScript, and many other languages because of how efficient it is.",
    sections: [
      {
        heading: "List methods",
        body: [
          "The key distinction: methods that modify in place (append, extend, insert, remove, pop, sort, reverse) return None. Methods that return a new value (index, count) do not modify. copy() is shallow -- nested objects are shared.",
        ],
        code: {
          lang: "python", label: "list methods",
          code:
`fruits = ["banana", "apple", "cherry"]

# Adding
fruits.append("date")             # add to end
fruits.insert(1, "avocado")       # insert at index 1
fruits.extend(["elderberry","fig"])# add multiple
print(fruits)

# Removing
fruits.remove("apple")            # remove first match (ValueError if missing)
popped = fruits.pop()             # remove+return last
popped2 = fruits.pop(0)           # remove+return at index
print(f"popped: {popped}, {popped2}")
print(fruits)

# Searching
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5]
print(nums.index(5))     # 4 -- index of FIRST occurrence
print(nums.count(1))     # 2 -- count of 1s
print(5 in nums)         # True

# Reversing and copying
nums.reverse()           # in-place
print(nums)
copy = nums.copy()       # shallow copy
nums.clear()             # empty the list
print(nums, copy)`,
          output:
`['banana', 'avocado', 'apple', 'cherry', 'date', 'elderberry', 'fig']
popped: fig, banana
['avocado', 'cherry', 'date', 'elderberry']
4
2
True
[5, 6, 2, 9, 5, 1, 4, 1, 3]
[] [5, 6, 2, 9, 5, 1, 4, 1, 3]`,
        },
      },
      {
        heading: "Sorting -- sort() vs sorted()",
        body: [
          "sort() modifies the list in place and returns None. sorted() returns a new sorted list and works on any iterable. Both accept key= and reverse=True.",
          "The key= function is applied to each element before comparing -- elements are sorted by their key value, not their actual value. This is how you sort complex objects.",
        ],
        code: {
          lang: "python", label: "sorting",
          code:
`# sort() -- in place, returns None
nums = [3, 1, 4, 1, 5, 9, 2, 6]
nums.sort()
print(nums)                # [1, 1, 2, 3, 4, 5, 6, 9]
nums.sort(reverse=True)
print(nums)                # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted() -- returns new list, original unchanged
words = ["banana", "Apple", "cherry", "DATE"]
print(sorted(words))                          # case-sensitive default
print(sorted(words, key=str.lower))           # case-insensitive
print(sorted(words, key=len))                 # by length
print(sorted(words, key=len, reverse=True))   # longest first

# Sort complex objects with key=
students = [
    {"name": "Alice", "gpa": 3.8, "year": 2},
    {"name": "Bob",   "gpa": 3.5, "year": 3},
    {"name": "Carol", "gpa": 3.8, "year": 1},
]
# Sort by GPA descending, then name ascending
sorted_students = sorted(students, key=lambda s: (-s["gpa"], s["name"]))
for s in sorted_students:
    print(f"  {s['name']:6} GPA:{s['gpa']} Year:{s['year']}")`,
          output:
`[1, 1, 2, 3, 4, 5, 6, 9]
[9, 6, 5, 4, 3, 2, 1, 1]
['Apple', 'DATE', 'banana', 'cherry']
['Apple', 'banana', 'cherry', 'DATE']
['Apple', 'DATE', 'banana', 'cherry']
['banana', 'cherry', 'Apple', 'DATE']
  Alice  GPA:3.8 Year:2
  Carol  GPA:3.8 Year:1
  Bob    GPA:3.5 Year:3`,
        },
        tip: "Use negative values in the key to sort descending for one field while ascending for another: key=lambda s: (-s['gpa'], s['name']) sorts by GPA descending, then name ascending when GPAs are equal.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does list.sort() return?", options: ["The sorted list", "A copy of the sorted list", "None", "The length of the list"], answer: 2, explanation: "sort() modifies the list in place and returns None. A common bug is writing sorted_list = my_list.sort() -- this gives sorted_list = None. Use sorted() if you need the result." },
      { type: "truefalse", q: "sorted() works on any iterable, not just lists.", answer: true, explanation: "sorted() works on lists, tuples, strings, dicts, generators -- any iterable. It always returns a new list. sort() only works on lists." },
      { type: "predict", q: "What prints?", code: `words = ["hi", "hello", "hey"]\nprint(sorted(words, key=len))`, answer: "['hi', 'hey', 'hello']", explanation: "Sorted by length: 'hi'(2), 'hey'(3), 'hello'(5). When lengths are equal ('hi' and 'hey' are both considered -- 'hi' is 2 and 'hey' is 3)." },
      { type: "fillblank", q: "To sort a list in reverse order in-place, use: my_list.sort(reverse=________)", answer: "True", hint: "The boolean that means yes, reverse it" },
      { type: "mcq", q: "What is the difference between list.remove(x) and list.pop(i)?", options: ["No difference", "remove(x) deletes by value; pop(i) deletes by index and returns the item", "pop removes all occurrences", "remove returns the removed item"], answer: 1, explanation: "remove(x) finds the first item equal to x and removes it. pop(i) removes and RETURNS the item at index i. pop() with no argument removes/returns the last item." },
    ],
  },

  l23: {
    id: "l23", title: "Unpacking, zip, and enumerate", duration: "9m",
    intro: "Three Python features that experienced programmers use constantly but beginners often miss: tuple unpacking for clean assignment, enumerate for index+value loops, and zip for combining iterables.",
    sections: [
      {
        heading: "Unpacking and zip",
        body: [
          "You have seen basic tuple unpacking (a, b = (1, 2)). Extended unpacking with * captures multiple values into a list. This works in for loops, function calls, and assignments.",
          "zip() combines two or more iterables element by element. It stops at the shortest one. dict(zip(keys, values)) is the classic one-liner for building a dict from two lists.",
        ],
        code: {
          lang: "python", label: "unpacking and zip",
          code:
`# Extended unpacking
first, *rest = [1, 2, 3, 4, 5]
print(first, rest)         # 1 [2, 3, 4, 5]

*head, last = [1, 2, 3, 4, 5]
print(head, last)          # [1, 2, 3, 4] 5

a, *middle, z = [1, 2, 3, 4, 5]
print(a, middle, z)        # 1 [2, 3, 4] 5

# Swap without temp variable
x, y = 10, 20
x, y = y, x
print(x, y)               # 20 10

# zip -- combine iterables
names  = ["Alice", "Bob", "Carol"]
scores = [95, 72, 88]
cities = ["London", "Paris", "Tokyo"]

for name, score in zip(names, scores):
    print(f"  {name}: {score}")

# zip with 3 iterables
for name, score, city in zip(names, scores, cities):
    print(f"  {name} ({city}): {score}")

# Build dict from two lists
keys   = ["name", "age", "city"]
values = ["Alice", 25, "London"]
person = dict(zip(keys, values))
print(person)

# Unzip -- * to unzip
pairs  = [("Alice", 95), ("Bob", 72), ("Carol", 88)]
names_out, scores_out = zip(*pairs)
print(list(names_out))
print(list(scores_out))`,
          output:
`1 [2, 3, 4, 5]
[1, 2, 3, 4] 5
1 [2, 3, 4] 5
20 10
  Alice: 95
  Bob: 72
  Carol: 88
  Alice (London): 95
  Bob (Paris): 72
  Carol (Tokyo): 88
{'name': 'Alice', 'age': 25, 'city': 'London'}
['Alice', 'Bob', 'Carol']
[95, 72, 88]`,
        },
      },
      {
        heading: "enumerate -- index and value together",
        body: [
          "enumerate() adds a counter to any iterable. Instead of tracking an index variable manually, you get both the index and value in each iteration. The start= argument sets the initial count (default 0).",
          "Using enumerate is considered more Pythonic than for i in range(len(lst)). It is also safer -- you can never have an index mismatch.",
        ],
        code: {
          lang: "python", label: "enumerate",
          code:
`fruits = ["apple", "banana", "cherry", "date"]

# Without enumerate (old way, avoid this)
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

print("---")

# With enumerate (Pythonic)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

print("---")

# Start counting from 1
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

print("---")

# Build numbered dict
numbered = {i: fruit for i, fruit in enumerate(fruits, 1)}
print(numbered)

# Find index and value of maximum
scores = [78, 92, 65, 88, 95, 71]
best_i, best_score = max(enumerate(scores), key=lambda x: x[1])
print(f"Highest score: {best_score} at index {best_i}")`,
          output:
`0: apple
1: banana
2: cherry
3: date
---
0: apple
1: banana
2: cherry
3: date
---
1. apple
2. banana
3. cherry
4. date
---
{1: 'apple', 2: 'banana', 3: 'cherry', 4: 'date'}
Highest score: 95 at index 4`,
        },
        tip: "enumerate is one of the most Pythonic tools available. If you find yourself writing for i in range(len(some_list)): just to get the index, use enumerate instead. It is cleaner, safer, and more readable.",
      },
    ],
    quiz: [
      { type: "predict", q: "What prints?", code: `a, *b = [1,2,3,4]\nprint(a, b)`, answer: "1 [2, 3, 4]", explanation: "a gets the first item (1). *b captures all remaining items as a list [2,3,4]." },
      { type: "mcq", q: "What does zip([1,2,3], ['a','b']) produce?", options: ["[(1,'a'),(2,'b'),(3,None)]", "[(1,'a'),(2,'b')]", "Error", "[(1,2,3),('a','b')]"], answer: 1, explanation: "zip stops at the shortest iterable. [1,2,3] has 3 items but ['a','b'] has only 2, so zip produces 2 pairs: (1,'a'),(2,'b')." },
      { type: "truefalse", q: "enumerate(items, start=1) starts numbering from 1 instead of 0.", answer: true, explanation: "The start= argument sets the initial counter value. enumerate(['a','b','c'], start=1) yields (1,'a'),(2,'b'),(3,'c')." },
      { type: "fillblank", q: "To build a dict from keys=['a','b'] and values=[1,2], use: dict(________(keys, values))", answer: "zip", hint: "The function that combines two iterables element by element" },
      { type: "mcq", q: "Why prefer enumerate over range(len(list))?", options: ["enumerate is faster", "enumerate is cleaner, safer (no index mismatch), and more Pythonic", "range does not work with lists", "They are identical"], answer: 1, explanation: "enumerate gives you the index and value together with no chance of index mismatch. range(len(x)) is verbose, error-prone, and not considered Pythonic Python style." },
    ],
  },

  l24: {
    id: "l24", title: "Working with Files -- CSV and Text", duration: "10m",
    intro: "Beyond basic file reading, real programs need to process structured data. CSV files are the most common data format -- spreadsheets, databases, and APIs all export CSV. This lesson covers CSV processing and useful text file patterns.",
    sections: [
      {
        heading: "CSV files with the csv module",
        body: [
          "CSV (Comma Separated Values) is a plain text format where each line is a row and values are separated by commas. The csv module handles edge cases like quoted fields containing commas automatically.",
          "csv.reader reads rows as lists of strings. csv.DictReader reads each row as a dict with column headers as keys -- much more convenient when you have named columns.",
        ],
        code: {
          lang: "python", label: "reading CSV",
          code:
`import csv

# Writing CSV first so we have something to read
rows = [
    ["Name", "Age", "City", "Score"],
    ["Alice", "25", "London", "95"],
    ["Bob",   "30", "Paris",  "72"],
    ["Carol", "22", "Tokyo",  "88"],
]
with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# Read with csv.reader -- each row is a list
print("=== csv.reader ===")
with open("data.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# Read with csv.DictReader -- each row is a dict
print("\\n=== csv.DictReader ===")
with open("data.csv") as f:
    for row in csv.DictReader(f):
        print(f"{row['Name']:8} from {row['City']:8} scored {row['Score']}")

# Write with DictWriter
students = [
    {"name": "Dave",  "grade": "A", "score": 91},
    {"name": "Eve",   "grade": "B", "score": 74},
]
with open("results.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["name", "grade", "score"])
    w.writeheader()
    w.writerows(students)
print("\\nSaved results.csv")`,
          output:
`=== csv.reader ===
['Name', 'Age', 'City', 'Score']
['Alice', '25', 'London', '95']
['Bob', '30', 'Paris', '72']
['Carol', '22', 'Tokyo', '88']

=== csv.DictReader ===
Alice    from London   scored 95
Bob      from Paris    scored 72
Carol    from Tokyo    scored 88

Saved results.csv`,
        },
      },
      {
        heading: "Useful text file patterns",
        body: [
          "Three patterns appear in almost every text-processing program: reading a file into a list of cleaned lines, processing a file line by line without loading it all, and writing output progressively.",
          "The walrus operator := (Python 3.8+) lets you assign and test in one expression -- useful for reading chunks of data in a while loop.",
        ],
        code: {
          lang: "python", label: "text file patterns",
          code:
`# Pattern 1: read all lines, stripped and non-empty
with open("data.csv") as f:
    lines = [line.strip() for line in f if line.strip()]
print(f"{len(lines)} non-empty lines")

# Pattern 2: process line by line (memory efficient for huge files)
with open("data.csv") as f:
    next(f)  # skip header line
    total_score = 0
    count = 0
    for line in f:
        parts = line.strip().split(",")
        if len(parts) >= 4:
            total_score += int(parts[3])
            count += 1
    if count:
        print(f"Average score: {total_score / count:.1f}")

# Pattern 3: write lines from a list
results = ["Alice: 95", "Bob: 72", "Carol: 88"]
with open("output.txt", "w") as f:
    f.write("\\n".join(results))
    f.write("\\n")  # trailing newline

# Pattern 4: append to a log file
import datetime
def log(message):
    with open("app.log", "a") as f:
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] {message}\\n")

log("Application started")
log("User logged in: alice")
log("Processing complete")

with open("app.log") as f:
    print(f.read())`,
          output:
`4 non-empty lines
Average score: 85.0
[2024-01-15 14:30:01] Application started
[2024-01-15 14:30:01] User logged in: alice
[2024-01-15 14:30:01] Processing complete`,
        },
        tip: "Always use newline='' when opening CSV files on Windows. Without it, Python adds extra blank rows because it inserts a newline AND csv module adds another. This is a common Windows-specific CSV bug.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What is the advantage of csv.DictReader over csv.reader?", options: ["It is faster", "Each row is a dict with column names as keys -- no need to remember column positions", "It handles larger files", "It validates data types"], answer: 1, explanation: "DictReader gives row['Name'] instead of row[0]. Much more readable and does not break if column order changes." },
      { type: "truefalse", q: "You should use newline='' when opening CSV files for writing on Windows.", answer: true, explanation: "Without newline='', Python's universal newlines mode adds \\r\\n but csv also adds \\r, resulting in double newlines (blank rows) on Windows." },
      { type: "predict", q: "What prints?", code: `lines = ["  hello  ", "", "  world  ", "  "]\nclean = [l.strip() for l in lines if l.strip()]\nprint(clean)`, answer: "['hello', 'world']", explanation: "strip() removes whitespace. if l.strip() filters out empty/whitespace-only lines. Result has only the two non-empty strings." },
      { type: "fillblank", q: "To skip the first line (header) when iterating a file, call: ________(f)", answer: "next", hint: "The built-in function that advances an iterator by one step" },
      { type: "mcq", q: "Which open mode adds to the end of an existing file without deleting its content?", options: ["'w'", "'r'", "'a'", "'x'"], answer: 2, explanation: "Mode 'a' (append) opens the file and positions the write pointer at the end. Mode 'w' truncates first. Mode 'x' fails if file exists." },
    ],
  },

  l25: {
    id: "l25", title: "Choosing the Right Data Structure", duration: "9m",
    intro: "Python gives you list, tuple, dict, set, and more. Knowing which to use and why is what separates someone who writes code that works from someone who writes code that is fast, readable, and maintainable.",
    sections: [
      {
        heading: "The decision guide",
        body: [
          "The choice of data structure affects correctness, performance, and readability. Lists are flexible but wrong for membership testing. Sets are perfect for membership but unordered. Dicts are for key-value mapping. Tuples communicate immutability.",
          "Time complexity matters at scale. A list membership check (in) is O(n) -- it scans every item. A set/dict membership check is O(1) -- instant regardless of size. For 1 million items, this is the difference between 1 second and 0.000001 seconds.",
        ],
        code: {
          lang: "python", label: "choosing the right structure",
          code:
`# When to use a LIST
# - ordered collection that may have duplicates
# - need index access: items[2]
# - will append/insert/remove frequently
todo_list = ["Buy milk", "Write code", "Go for run", "Buy milk"]  # duplicates ok

# When to use a TUPLE
# - fixed data that should not change
# - returning multiple values from a function
# - dictionary key
SCREEN_SIZE = (1920, 1080)   # constant config -- tuple communicates "do not change"
coordinates = {(0,0): "origin", (1,2): "point"}  # tuples as dict keys

# When to use a SET
# - unique items only
# - fast membership testing
# - set operations (union, intersection)
valid_extensions = {".jpg", ".png", ".gif", ".webp"}
filename = "photo.jpg"
if filename[filename.rfind("."):] in valid_extensions:
    print("Valid image file")

seen_ids = set()
def process_event(event_id):
    if event_id in seen_ids:
        return "duplicate"
    seen_ids.add(event_id)
    return "new"

# When to use a DICT
# - key-value mapping
# - fast lookup by a meaningful key (not just an integer index)
user = {"name": "Alice", "age": 25, "email": "alice@example.com"}

# Performance comparison
import time

data = list(range(1000000))
data_set = set(data)

start = time.time()
_ = 999999 in data         # list scan -- O(n)
list_time = time.time() - start

start = time.time()
_ = 999999 in data_set     # set lookup -- O(1)
set_time = time.time() - start

print(f"List lookup: {list_time:.6f}s")
print(f"Set lookup:  {set_time:.6f}s")`,
          output:
`Valid image file
List lookup: 0.012453s
Set lookup:  0.000001s`,
        },
      },
      {
        heading: "Summary table and real-world guidance",
        body: [
          "list: ordered, duplicates allowed, O(n) membership, mutable. Use for sequences of items you will process in order.",
          "tuple: ordered, duplicates allowed, O(n) membership, IMMUTABLE. Use for fixed data, multiple return values, dict keys.",
          "set: unordered, NO duplicates, O(1) membership, mutable. Use for uniqueness, fast lookup, mathematical set operations.",
          "dict: key-value pairs, O(1) lookup by key, ordered by insertion (Python 3.7+). Use whenever you map one thing to another.",
          "deque (collections.deque): fast append/pop from BOTH ends. Use for queues and sliding windows. list.pop(0) is O(n) but deque.popleft() is O(1).",
        ],
        code: {
          lang: "python", label: "common mistakes and fixes",
          code:
`from collections import deque

# Mistake 1: using list for membership checking
bad_list  = list(range(100000))
good_set  = set(range(100000))
# bad:  50000 in bad_list  -- scans up to 50000 items
# good: 50000 in good_set  -- instant

# Mistake 2: list as queue (pop from front is slow)
# bad: pop(0) is O(n)
queue_list = [1, 2, 3, 4, 5]
first = queue_list.pop(0)   # slow for large lists

# good: deque is O(1) from both ends
queue_deque = deque([1, 2, 3, 4, 5])
first = queue_deque.popleft()   # fast

# Mistake 3: tuple vs list for config
# bad: color = [255, 0, 0]  -- list implies it might change
# good: color = (255, 0, 0) -- tuple communicates fixed

# Mistake 4: dict of lists manually
# bad:
groups = {}
items  = [("a", 1), ("b", 2), ("a", 3), ("b", 4)]
for k, v in items:
    if k not in groups:
        groups[k] = []
    groups[k].append(v)

# good: defaultdict
from collections import defaultdict
groups2 = defaultdict(list)
for k, v in items:
    groups2[k].append(v)

print(dict(groups))
print(dict(groups2))`,
          output:
`{'a': [1, 3], 'b': [2, 4]}
{'a': [1, 3], 'b': [2, 4]}`,
        },
        tip: "When in doubt: start with a list. If you need fast membership testing on a large collection, switch to a set or dict. If the data should not change, use a tuple. If you need to group items by key, use defaultdict(list).",
      },
    ],
    quiz: [
      { type: "mcq", q: "Which data structure gives O(1) membership testing?", options: ["list", "tuple", "set", "Both set and dict"], answer: 3, explanation: "Both set and dict use hash tables for O(1) average-case lookup. Lists and tuples require scanning all items O(n)." },
      { type: "truefalse", q: "A tuple can be used as a dictionary key but a list cannot.", answer: true, explanation: "Dict keys must be hashable (immutable). Tuples are immutable and hashable. Lists are mutable and not hashable -- using a list as a dict key raises TypeError." },
      { type: "predict", q: "What prints?", code: `s = {1,2,3,2,1}\nprint(len(s))`, answer: "3", explanation: "Sets store unique items only. {1,2,3,2,1} has duplicates which are silently removed. The set contains {1,2,3} -- length 3." },
      { type: "fillblank", q: "For fast append and pop from BOTH ends of a sequence, use collections.________", answer: "deque", hint: "Double-ended queue -- O(1) on both ends unlike list which is O(n) for pop(0)" },
      { type: "mcq", q: "You need to count how many times each word appears in a text. Which is best?", options: ["A list of tuples", "Counter from collections", "A set", "A tuple"], answer: 1, explanation: "Counter is a dict subclass built exactly for counting. Counter(words) gives you word frequencies instantly. most_common(n) gives you the top n words." },
    ],
  },

  // \u2500\u2500 VERY BEGINNER PROJECTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l42: {
    id: "l42", title: "Starter Project: Simple Calculator", duration: "12m",
    intro: "Your very first project. A calculator you build from scratch, line by line, with no prior project experience needed. If you can write print() and input() you can build this.",
    sections: [
      {
        heading: "What we are building -- step by step",
        body: [
          "A calculator that asks the user for two numbers and an operator (+, -, *, /), then shows the result. That is the whole thing. Simple, but it covers: input(), type conversion, if/elif/else, functions, and f-strings.",
          "We build it in three stages. First: the absolute minimum version (10 lines). Second: make it handle division by zero and invalid input. Third: add a loop so it keeps running until the user says quit.",
        ],
        code: {
          lang: "python", label: "stage 1 -- the minimum version (10 lines!)",
          code:
`# Stage 1: dead simple -- just make it work
num1 = float(input("First number: "))
op   = input("Operator (+, -, *, /): ")
num2 = float(input("Second number: "))

if op == "+":
    result = num1 + num2
elif op == "-":
    result = num1 - num2
elif op == "*":
    result = num1 * num2
elif op == "/":
    result = num1 / num2
else:
    result = "Unknown operator"

print(f"Answer: {result}")`,
          output:
`First number: 10
Operator (+, -, *, /): *
Second number: 5
Answer: 50.0`,
        },
      },
      {
        heading: "Stage 2 -- add error handling",
        body: [
          "The stage 1 version crashes if the user types 'hello' instead of a number. It also crashes if they try to divide by zero. We fix both with try/except.",
          "We also wrap the calculation in a function. Functions make code reusable and easier to test. This is the right habit to build from the start.",
        ],
        code: {
          lang: "python", label: "stage 2 -- with error handling",
          code:
`def calculate(num1, op, num2):
    if op == "+":   return num1 + num2
    if op == "-":   return num1 - num2
    if op == "*":   return num1 * num2
    if op == "/":
        if num2 == 0:
            return "Error: Cannot divide by zero"
        return num1 / num2
    return f"Error: Unknown operator '{op}'"

def get_number(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("  Please enter a number (like 5 or 3.14)")

def main():
    print("Simple Calculator")
    print("-" * 20)

    num1 = get_number("First number:  ")
    op   = input("Operator (+,-,*,/): ").strip()
    num2 = get_number("Second number: ")

    result = calculate(num1, op, num2)

    if isinstance(result, str):
        print(result)
    else:
        print(f"{num1} {op} {num2} = {result}")

main()`,
          output:
`Simple Calculator
--------------------
First number:  hello
  Please enter a number (like 5 or 3.14)
First number:  10
Operator (+,-,*,/): /
Second number: 0
Error: Cannot divide by zero`,
        },
      },
      {
        heading: "Stage 3 -- keep running with a loop",
        body: [
          "Stage 3 adds a while loop so the calculator keeps running until the user types 'q'. This is the final complete version.",
          "Notice how small the main() function is -- all the logic is in calculate() and get_number(). This is good design: each function does ONE thing.",
        ],
        code: {
          lang: "python", label: "stage 3 -- full looping calculator",
          code:
`def calculate(num1, op, num2):
    if op == "+":   return num1 + num2
    if op == "-":   return num1 - num2
    if op == "*":   return num1 * num2
    if op == "/":
        if num2 == 0: return "Cannot divide by zero!"
        return num1 / num2
    return f"Unknown operator: {op}"

def get_number(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("  Numbers only please.")

def main():
    print("Calculator -- type q to quit")
    while True:
        raw = input("\\nFirst number (or q): ").strip()
        if raw.lower() == "q":
            print("Goodbye!")
            break
        try:
            num1 = float(raw)
        except ValueError:
            print("  Numbers only please.")
            continue

        op   = input("Operator (+,-,*,/): ").strip()
        num2 = get_number("Second number: ")

        result = calculate(num1, op, num2)
        if isinstance(result, str):
            print(f"  {result}")
        else:
            print(f"  {num1} {op} {num2} = {result:.4g}")

main()`,
          output:
`Calculator -- type q to quit

First number (or q): 15
Operator (+,-,*,/): +
Second number: 7
  15.0 + 7.0 = 22

First number (or q): 100
Operator (+,-,*,/): /
Second number: 3
  100.0 / 3.0 = 33.33

First number (or q): q
Goodbye!`,
        },
        tip: ":.4g in an f-string is a great format for calculator output. It shows up to 4 significant digits and removes trailing zeros: 22.0 becomes 22, 33.3333 becomes 33.33.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does float(input('Enter: ')) do?", options: ["Prints a float", "Reads text input and converts it to a float", "Creates a float variable", "Validates that input is a number"], answer: 1, explanation: "input() always returns a string. float() converts that string to a floating-point number. If the string is not a valid number, float() raises ValueError." },
      { type: "truefalse", q: "Wrapping logic in a function makes code harder to read.", answer: false, explanation: "Functions make code more readable by giving operations a name. They also make code reusable and testable. calculate(num1, op, num2) is clearer than a block of if/elif inline." },
      { type: "predict", q: "What prints?", code: `def calc(a, op, b):\n    if op == "+": return a + b\n    return "unknown"\nprint(calc(3, "+", 4))`, answer: "7", explanation: "calc(3, '+', 4) matches op=='+', returns 3+4=7." },
      { type: "fillblank", q: "To keep asking for input until it is valid, use a ________ True loop with try/except.", answer: "while", hint: "The loop that keeps running as long as a condition is true" },
      { type: "mcq", q: "What does 'isinstance(result, str)' check?", options: ["If result equals 'str'", "If result is a string", "If result can be converted to string", "If str is in result"], answer: 1, explanation: "isinstance(result, str) returns True if result is a string object. We use this to detect error messages (which are strings) vs numbers." },
    ],
  },

  l43: {
    id: "l43", title: "Starter Project: Mad Libs Story Generator", duration: "10m",
    intro: "The most beginner-friendly project in the course. Mad Libs asks for words (a noun, a verb, an adjective) then slots them into a story template. Pure fun, zero complexity -- perfect for practising input, strings, and f-strings.",
    sections: [
      {
        heading: "What is Mad Libs and what we are building",
        body: [
          "Mad Libs is a game where you fill in blanks in a story without knowing the story first. The results are usually funny. To build it you need: input() to collect words, an f-string or .format() to slot them into a template, and a print() to show the result.",
          "We start with a single story, then add multiple stories to choose from, then add a loop to play as many times as you like.",
        ],
        code: {
          lang: "python", label: "version 1 -- one story",
          code:
`# Step 1: collect the words
print("MAD LIBS -- fill in the blanks!")
print("-" * 35)

adjective1 = input("An adjective (e.g. fluffy):     ")
noun1      = input("A noun (e.g. spaceship):         ")
verb_past  = input("A past-tense verb (e.g. danced): ")
adjective2 = input("Another adjective (e.g. soggy):  ")
noun2      = input("Another noun (e.g. banana):      ")
place      = input("A place (e.g. the moon):         ")

# Step 2: slot them into the story
story = f"""
Yesterday, a {adjective1} {noun1} {verb_past} into {place}.
Everyone was shocked because the {noun1} was carrying
a {adjective2} {noun2}. Nobody knew what to do, so they
all had a cup of tea and went home.
"""

print("\\nYour story:")
print("-" * 35)
print(story)`,
          output:
`MAD LIBS -- fill in the blanks!
-----------------------------------
An adjective (e.g. fluffy):     tiny
A noun (e.g. spaceship):         robot
A past-tense verb (e.g. danced): crashed
Another adjective (e.g. soggy):  purple
Another noun (e.g. banana):      umbrella
A place (e.g. the moon):         the supermarket

Your story:
-----------------------------------
Yesterday, a tiny robot crashed into the supermarket.
Everyone was shocked because the robot was carrying
a purple umbrella. Nobody knew what to do, so they
all had a cup of tea and went home.`,
        },
      },
      {
        heading: "Version 2 -- multiple stories",
        body: [
          "We store multiple story templates in a list, let the user pick one, then fill it in. This introduces: lists of strings, user choice with int(), and index access.",
          "Each story is stored as a template dict with the story text and a list of what blanks to ask for. This structure makes adding new stories very easy.",
        ],
        code: {
          lang: "python", label: "version 2 -- story selection",
          code:
`def get_words(prompts):
    words = {}
    for key, prompt in prompts.items():
        words[key] = input(f"  {prompt}: ").strip() or "???"
    return words

STORIES = [
    {
        "title": "The Space Adventure",
        "prompts": {
            "adj":   "An adjective",
            "noun":  "A noun",
            "verb":  "A past-tense verb",
            "place": "A planet name",
        },
        "text": lambda w: f"""
Captain {w['noun']} {w['verb']} her {w['adj']} rocket
and landed on {w['place']}. The aliens offered her
a sandwich, which was {w['adj']} and delicious.
""",
    },
    {
        "title": "The School Day",
        "prompts": {
            "teacher": "A teacher's name",
            "subject": "A school subject",
            "adj":     "An adjective",
            "animal":  "An animal",
        },
        "text": lambda w: f"""
{w['teacher']} walked into {w['subject']} class
carrying a {w['adj']} {w['animal']}. The students
screamed and ran out of the {w['adj']} classroom.
""",
    },
]

def main():
    print("MAD LIBS GENERATOR")
    print("-" * 30)
    print("Choose a story:")
    for i, s in enumerate(STORIES, 1):
        print(f"  {i}. {s['title']}")

    while True:
        try:
            choice = int(input("\\nStory number: ")) - 1
            if 0 <= choice < len(STORIES):
                break
            print(f"  Please enter 1 to {len(STORIES)}")
        except ValueError:
            print("  Enter a number.")

    story = STORIES[choice]
    print(f"\\nFilling in: {story['title']}")
    words = get_words(story["prompts"])
    print("\\nYour story:")
    print("-" * 30)
    print(story["text"](words))

    if input("Play again? (y/n): ").lower() == "y":
        main()

main()`,
          output:
`MAD LIBS GENERATOR
------------------------------
Choose a story:
  1. The Space Adventure
  2. The School Day

Story number: 1

Filling in: The Space Adventure
  An adjective: sparkly
  A noun: chef
  A past-tense verb: launched
  A planet name: Biscuitron

Your story:
------------------------------
Captain chef launched her sparkly rocket
and landed on Biscuitron. The aliens offered her
a sandwich, which was sparkly and delicious.`,
        },
        tip: "A lambda with no arguments is a quick way to use an f-string as a template: text = lambda w: f'Hello {w[\"name\"]}'. Call it with text(words) to fill it in. For larger projects, use string .format() or Jinja2 templates instead.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does input() always return?", options: ["An integer", "A float", "A string", "Whatever type the user types"], answer: 2, explanation: "input() always returns a string, regardless of what the user types. If they type 42, you get the string '42', not the integer 42. Use int() or float() to convert." },
      { type: "predict", q: "What prints?", code: `name = "robot"\nadj  = "tiny"\nprint(f"A {adj} {name}!")`, answer: "A tiny robot!", explanation: "f-strings replace {variable} with the variable's value. f'A {adj} {name}!' with adj='tiny' and name='robot' gives 'A tiny robot!'." },
      { type: "truefalse", q: "Storing story templates in a list makes it easy to add new stories without changing the main logic.", answer: true, explanation: "With a list of story dicts, adding a new story is just adding a new dict to STORIES. The main() function loops over the list automatically -- no if/elif changes needed." },
      { type: "fillblank", q: "To get a value from a dict with a default if the key is missing, use: words.________(key, default)", answer: "get", hint: "The dict method for safe key access" },
      { type: "mcq", q: "What does 'or \"???\"' do in: words[key] = input(...).strip() or '???'", options: ["Raises an error on empty input", "Uses '???' if the user enters nothing", "Appends '???' to all words", "Nothing"], answer: 1, explanation: "If input().strip() returns an empty string '' (falsy), Python evaluates the right side of 'or' and returns '???'. This gives a fallback for blank answers." },
    ],
  },

  l44: {
    id: "l44", title: "Starter Project: Quiz Game", duration: "13m",
    intro: "Build a quiz game that asks multiple-choice questions, tracks the score, shows explanations for wrong answers, and gives a final grade. This project uses lists of dicts, loops, random shuffling, and a clean results display.",
    sections: [
      {
        heading: "Storing questions",
        body: [
          "Each question is a dict with a question text, list of options, the correct answer index, and an explanation. Storing questions as data (dicts in a list) rather than code means you can add 100 questions by just adding 100 dicts -- no logic changes.",
          "This is the data-driven design pattern: separate your data from your logic. It is the same idea behind databases and config files.",
        ],
        code: {
          lang: "python", label: "question data structure",
          code:
`QUESTIONS = [
    {
        "q": "What does print() do in Python?",
        "options": [
            "A) Sends text to a printer",
            "B) Displays text on the screen",
            "C) Creates a variable",
            "D) Asks the user for input",
        ],
        "answer": "B",
        "explanation": "print() displays text to the terminal (stdout). It has nothing to do with printers!",
    },
    {
        "q": "What is the output of: 10 // 3?",
        "options": ["A) 3.33", "B) 3", "C) 4", "D) 1"],
        "answer": "B",
        "explanation": "// is integer (floor) division. It discards the remainder. 10 // 3 = 3.",
    },
    {
        "q": "Which of these creates a list?",
        "options": ["A) (1,2,3)", "B) {1,2,3}", "C) [1,2,3]", "D) <1,2,3>"],
        "answer": "C",
        "explanation": "Square brackets [] create a list. () is a tuple, {} is a set or dict.",
    },
    {
        "q": "What does len([1,2,3,4,5]) return?",
        "options": ["A) 4", "B) 6", "C) 5", "D) 0"],
        "answer": "C",
        "explanation": "len() counts items in a sequence. [1,2,3,4,5] has 5 items.",
    },
    {
        "q": "What keyword exits a loop immediately?",
        "options": ["A) exit", "B) stop", "C) return", "D) break"],
        "answer": "D",
        "explanation": "break exits the innermost loop immediately. continue skips to the next iteration.",
    },
]

print(f"Quiz has {len(QUESTIONS)} questions")
print(f"First question: {QUESTIONS[0]['q']}")`,
          output:
`Quiz has 5 questions
First question: What does print() do in Python?`,
        },
      },
      {
        heading: "The game loop",
        body: [
          "The game shuffles questions with random.shuffle(), asks each one, checks the answer, and tracks score. At the end it shows a percentage and a grade.",
          "We display each option on its own line and accept single letter answers (A, B, C, D). Comparing with .upper().strip() means 'b', 'B', ' b ' all count as correct.",
        ],
        code: {
          lang: "python", label: "full quiz game",
          code:
`import random

def run_quiz(questions, shuffle=True):
    if shuffle:
        questions = questions.copy()
        random.shuffle(questions)

    score  = 0
    total  = len(questions)
    wrong  = []

    print("\\nPYTHON QUIZ")
    print("=" * 40)
    print(f"  {total} questions -- type A, B, C or D")
    print("=" * 40)

    for i, q in enumerate(questions, 1):
        print(f"\\nQ{i}/{total}: {q['q']}")
        for option in q["options"]:
            print(f"  {option}")

        while True:
            answer = input("Your answer: ").upper().strip()
            if answer in ("A", "B", "C", "D"):
                break
            print("  Please type A, B, C, or D")

        if answer == q["answer"]:
            print("  Correct!")
            score += 1
        else:
            print(f"  Wrong! Correct answer: {q['answer']}")
            print(f"  {q['explanation']}")
            wrong.append(q)

    # Final score
    pct = score / total * 100
    if   pct == 100: grade = "A+  Perfect!"
    elif pct >= 80:  grade = "A   Excellent"
    elif pct >= 60:  grade = "B   Good job"
    elif pct >= 40:  grade = "C   Keep practising"
    else:            grade = "D   Review the basics"

    print("\\n" + "=" * 40)
    print(f"  SCORE: {score}/{total}  ({pct:.0f}%)  {grade}")
    print("=" * 40)

    if wrong:
        print(f"\\n  Review these {len(wrong)} question(s):")
        for q in wrong:
            print(f"  - {q['q']}")
            print(f"    Answer: {q['answer']}) {q['explanation']}")

    return score, total

run_quiz(QUESTIONS)`,
          output:
`PYTHON QUIZ
========================================
  5 questions -- type A, B, C or D
========================================

Q1/5: Which of these creates a list?
  A) (1,2,3)
  B) {1,2,3}
  C) [1,2,3]
  D) <1,2,3>
Your answer: C
  Correct!

Q2/5: What does len([1,2,3,4,5]) return?
  ...

========================================
  SCORE: 4/5  (80%)  A   Excellent
========================================`,
        },
        tip: "questions.copy() before shuffling is important -- random.shuffle() modifies the list in place. Without copying, you would shuffle the original QUESTIONS list and the order would be different on the next run.",
      },
    ],
    quiz: [
      { type: "mcq", q: "Why store questions as dicts in a list instead of writing if/elif for each question?", options: ["Dicts are faster", "Data-driven design: adding questions means adding data, not changing logic", "Python requires it", "Dicts use less memory"], answer: 1, explanation: "Separating data from logic means you can add 100 questions without touching the game loop. The loop handles any number of questions automatically." },
      { type: "truefalse", q: "random.shuffle() returns a new shuffled list, leaving the original unchanged.", answer: false, explanation: "random.shuffle() modifies the list IN PLACE and returns None. Use list.copy() first if you want to keep the original order." },
      { type: "predict", q: "What prints?", code: `answer = " b "\nprint(answer.upper().strip())`, answer: "B", explanation: ".upper() converts to uppercase: ' B '. .strip() removes whitespace: 'B'. Order matters -- strip after upper." },
      { type: "fillblank", q: "To pick questions in a random order, call: random.________(questions)", answer: "shuffle", hint: "The random function that reorders a list in place" },
      { type: "mcq", q: "What does questions.copy() do before shuffling?", options: ["Creates a sorted copy", "Creates a shallow copy so the original QUESTIONS list stays in original order", "Removes duplicates", "Nothing important"], answer: 1, explanation: "shuffle modifies in place. Without copy(), you shuffle the original QUESTIONS list permanently. copy() gives a separate list to shuffle so originals stay unchanged." },
    ],
  },

};

export function getLessonContent7(id: string): LessonContent | undefined {
  return lessons[id];
}