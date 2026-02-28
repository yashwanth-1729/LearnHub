import type { LessonContent } from "./lesson-content";

const lessons: Record<string, LessonContent> = {

  l32: {
    id: "l32", title: "Iterators and Generators", duration: "13m",
    intro: "Iterators and generators are the engine behind for loops, list comprehensions, and lazy evaluation in Python. Understanding them makes you a much better Python programmer and unlocks memory-efficient patterns for large datasets.",
    sections: [
      {
        heading: "What is an iterator?",
        body: [
          "An iterator is any object that implements two methods: __iter__() which returns the iterator itself, and __next__() which returns the next value each time it is called. When there are no more values, __next__() raises StopIteration.",
          "Every for loop in Python secretly calls iter() on the object to get an iterator, then repeatedly calls next() on it until StopIteration is raised. You can do this manually to see exactly what the loop does.",
          "All sequences (lists, tuples, strings) and many other objects (dicts, sets, files) are iterable -- they can produce an iterator. An iterable is NOT necessarily an iterator itself. A list is iterable but not an iterator.",
        ],
        code: {
          lang: "python", label: "iterators under the hood",
          code: `# A for loop secretly does this:
fruits = ["apple", "banana", "cherry"]

# What Python actually does:
it = iter(fruits)        # calls fruits.__iter__()
print(next(it))          # apple  -- calls it.__next__()
print(next(it))          # banana
print(next(it))          # cherry
# print(next(it))        # raises StopIteration!

# Prove it: manual iteration is identical to for loop
numbers = [1, 2, 3]
it = iter(numbers)
while True:
    try:
        value = next(it)
        print(value)
    except StopIteration:
        break

# Build a custom iterator class
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self          # iterator returns itself

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for n in Countdown(5):
    print(n, end=" ")`,
          output: `apple
banana
cherry
1
2
3
5 4 3 2 1`,
        },
      },
      {
        heading: "Generators -- the easy way to make iterators",
        body: [
          "Writing a full iterator class with __iter__ and __next__ is tedious. Generators are a shortcut: write a function that uses the yield keyword instead of return. Each call to next() runs the function until it hits yield, returns that value, then PAUSES -- saving all local variables. Next call resumes from where it paused.",
          "This pause-and-resume behaviour is what makes generators special. A generator function does not run at all when you call it -- it returns a generator object. The code only runs as you consume values from it.",
          "Generators are memory-efficient because they produce one value at a time instead of building the entire result in memory. A generator for a billion numbers uses almost no memory.",
        ],
        code: {
          lang: "python", label: "generator functions",
          code: `# Generator function -- uses yield instead of return
def countdown(start):
    print(f"Starting countdown from {start}")
    while start > 0:
        yield start          # pause here, return start
        start -= 1           # resumes here on next() call
    print("Blast off!")

gen = countdown(3)
print(type(gen))             # <class 'generator'>
print(next(gen))             # Starting countdown from 3 / 3
print(next(gen))             # 2
print(next(gen))             # 1
# print(next(gen))           # Blast off! then StopIteration

print("---")

# Use in a for loop (most common)
for n in countdown(5):
    print(n, end=" ")

print()

# Infinite generator -- no while True problem because it is lazy
def integers_from(n):
    while True:
        yield n
        n += 1

gen = integers_from(1)
print([next(gen) for _ in range(5)])   # [1, 2, 3, 4, 5]`,
          output: `<class 'generator'>
Starting countdown from 3
3
2
1
---
Starting countdown from 5
5 4 3 2 1
[1, 2, 3, 4, 5]`,
        },
        tip: "Think of yield as a pause button. When Python hits yield, it freezes the function's entire state (all local variables, which line it is on) and returns the value. Next call hits play and resumes from exactly that point.",
      },
      {
        heading: "Generator expressions -- comprehensions that are lazy",
        body: [
          "Just as list comprehensions create lists, generator expressions create generators. The syntax is identical but with parentheses instead of square brackets. The difference: a list comprehension builds the entire list in memory immediately. A generator expression produces values one at a time, on demand.",
          "For large datasets, the difference is massive. Processing a 10GB file line by line with a generator uses kilobytes of memory. Loading it all into a list first would require 10GB of RAM.",
        ],
        code: {
          lang: "python", label: "generator expressions",
          code: `import sys

# List comprehension -- builds entire list in memory NOW
squares_list = [x**2 for x in range(1000000)]
print(f"List size: {sys.getsizeof(squares_list):,} bytes")

# Generator expression -- lazy, produces one value at a time
squares_gen = (x**2 for x in range(1000000))
print(f"Generator size: {sys.getsizeof(squares_gen)} bytes")

# Both give the same values -- generator just does it lazily
print(sum(squares_gen))          # works perfectly

# Practical: process a large file efficiently
def count_long_lines(filename, min_length=80):
    with open(filename) as f:
        # Generator: reads one line at a time, never loads whole file
        long_lines = (line for line in f if len(line) >= min_length)
        return sum(1 for _ in long_lines)

# Chaining generators -- each step is lazy
numbers   = (x for x in range(1, 1000001))
evens     = (x for x in numbers if x % 2 == 0)
squares   = (x**2 for x in evens)
big       = (x for x in squares if x > 1000)
result    = next(big)    # computes only as many as needed!
print(f"First even square > 1000: {result}")`,
          output: `List size: 8,697,464 bytes
Generator size: 104 bytes
333333833333500000
First even square > 1000: 1156`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What keyword turns a regular function into a generator function?", options: ["return", "yield", "generate", "pause"], answer: 1, explanation: "yield turns a function into a generator. Each yield pauses execution, saves state, and returns the value. next() call resumes from that point." },
      { type: "truefalse", q: "A generator expression uses square brackets [ ] like a list comprehension.", answer: false, explanation: "Generator expressions use parentheses ( ). Square brackets [ ] create list comprehensions that build the full list immediately." },
      { type: "predict", q: "What prints?", code: `def gen():\n    yield 1\n    yield 2\n    yield 3\ng = gen()\nprint(next(g))\nprint(next(g))`, answer: "1\n2", explanation: "First next() runs until yield 1 and returns 1. Second next() resumes and runs until yield 2, returning 2." },
      { type: "fillblank", q: "When a generator has no more values, calling next() raises ________.", answer: "StopIteration", hint: "The exception that signals end of iteration" },
      { type: "mcq", q: "Why are generators more memory-efficient than lists for large datasets?", options: ["Generators compress data", "Generators produce one value at a time instead of storing everything in memory", "Generators use a faster algorithm", "Generators skip duplicate values"], answer: 1, explanation: "A generator yields one value at a time on demand. A list stores all values in memory at once. For large datasets, generators use vastly less memory." },
    ],
  },

  l33: {
    id: "l33", title: "Decorators", duration: "12m",
    intro: "A decorator is a function that wraps another function to add behaviour before, after, or around it -- without modifying the original function's code. They are used everywhere in Python: Flask routes, Django views, caching, logging, timing, and access control.",
    sections: [
      {
        heading: "Functions are objects -- the foundation of decorators",
        body: [
          "To understand decorators, you first need to know that functions in Python are objects, just like integers or strings. You can assign them to variables, pass them as arguments, return them from other functions, and store them in lists.",
          "A higher-order function is a function that takes another function as an argument or returns a function. You have already seen these: sorted(key=...), map(), filter(). Decorators are built on this same idea.",
        ],
        code: {
          lang: "python", label: "functions as objects",
          code: `# Functions are objects -- assign to variables
def greet(name):
    return f"Hello, {name}!"

say_hi = greet         # no parentheses -- we are not calling it
print(say_hi("Alice")) # Hello, Alice!

# Pass functions as arguments
def apply(func, value):
    return func(value)

print(apply(greet, "Bob"))         # Hello, Bob!
print(apply(str.upper, "hello"))   # HELLO

# Return functions from functions (closure)
def make_multiplier(n):
    def multiply(x):
        return x * n     # n is captured from outer scope
    return multiply      # return the function, not the result

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))   # 10
print(triple(5))   # 15`,
          output: `Hello, Alice!
Hello, Bob!
HELLO
10
15`,
        },
      },
      {
        heading: "Building a decorator from scratch",
        body: [
          "A decorator is a function that takes a function, wraps it in another function that adds some behaviour, and returns the wrapper. The @ syntax is just shorthand for this wrapping.",
          "The wrapper function must accept any arguments with *args and **kwargs so it can work with any function it wraps. It calls the original function with those same arguments.",
          "functools.wraps is a decorator that copies the original function's name, docstring, and other metadata to the wrapper. Without it, the wrapped function loses its identity.",
        ],
        code: {
          lang: "python", label: "building decorators",
          code: `import functools
import time

# A timing decorator -- measures how long a function takes
def timer(func):
    @functools.wraps(func)        # preserve original function metadata
    def wrapper(*args, **kwargs):
        start  = time.time()
        result = func(*args, **kwargs)   # call original function
        end    = time.time()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

# Apply with @ syntax -- equivalent to: slow_sum = timer(slow_sum)
@timer
def slow_sum(n):
    total = 0
    for i in range(n):
        total += i
    return total

result = slow_sum(1000000)
print(f"Result: {result}")

# A logging decorator
def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args} kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(3, 4)`,
          output: `slow_sum took 0.0821s
Result: 499999500000
Calling add with args=(3, 4) kwargs={}
add returned 7`,
        },
      },
      {
        heading: "Practical decorators -- caching, retry, validation",
        body: [
          "Python's standard library includes functools.lru_cache which memoizes (caches) function results. If you call the same function with the same arguments again, it returns the cached result instantly instead of recomputing.",
          "You can stack multiple decorators on one function. They apply from bottom to top -- the decorator closest to the function is applied first.",
          "Decorators with arguments require an extra layer of nesting: a function that takes the arguments and returns the actual decorator.",
        ],
        code: {
          lang: "python", label: "practical decorators",
          code: `import functools

# Built-in caching decorator
@functools.lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(50))   # instant -- cached results

# Stacking decorators
def bold(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return "<b>" + func(*args, **kwargs) + "</b>"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return "<i>" + func(*args, **kwargs) + "</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Hello {name}"

print(greet("Alice"))   # <b><i>Hello Alice</i></b>

# Decorator with arguments -- needs extra layer
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say(msg):
    print(msg)

say("Hello!")`,
          output: `12586269025
<b><i>Hello Alice</i></b>
Hello!
Hello!
Hello!`,
        },
        tip: "@functools.lru_cache is one of the most powerful built-in decorators. It can make recursive functions like fibonacci run in O(n) instead of O(2^n) -- the difference between instant and billions of years for large inputs.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does @timer above a function definition do?", options: ["Deletes the function after timing", "Wraps the function with timer, replacing it with the wrapper", "Runs the function immediately", "Makes the function run faster"], answer: 1, explanation: "@timer is shorthand for func = timer(func). It replaces the function with timer's wrapper, which adds timing behaviour." },
      { type: "truefalse", q: "Without @functools.wraps, a decorated function loses its original name and docstring.", answer: true, explanation: "Without functools.wraps, the wrapper function has its own name ('wrapper'), not the original. functools.wraps copies __name__, __doc__, and other metadata from the original." },
      { type: "predict", q: "What prints?", code: `def double(func):\n    def wrapper(*args):\n        return func(*args) * 2\n    return wrapper\n\n@double\ndef five():\n    return 5\n\nprint(five())`, answer: "10", explanation: "@double wraps five(). Calling five() calls wrapper(), which calls the original five() getting 5, then returns 5*2=10." },
      { type: "fillblank", q: "functools.________ copies a function's name and docstring to its wrapper.", answer: "wraps", hint: "Used inside decorator definitions to preserve metadata" },
      { type: "mcq", q: "When stacking @bold and @italic decorators (bold on top), what wraps first?", options: ["bold wraps first", "italic wraps first (closer to function)", "Both wrap simultaneously", "Order does not matter"], answer: 1, explanation: "Decorators apply bottom-up. @italic (closer to the function) is applied first, then @bold wraps the result. So output is bold(italic(original))." },
    ],
  },

  l34: {
    id: "l34", title: "The Standard Library", duration: "11m",
    intro: "Python comes with batteries included -- over 200 modules in the standard library covering everything from file operations to cryptography to web servers. Knowing what exists saves you from reinventing the wheel.",
    sections: [
      {
        heading: "datetime -- working with dates and times",
        body: [
          "The datetime module provides classes for representing and manipulating dates, times, and time intervals. datetime.datetime represents a specific moment in time. datetime.date represents just a date. datetime.timedelta represents a duration.",
          "The most common mistake with dates: never store dates as strings. Store them as datetime objects and convert to strings only for display. String dates cannot be compared, added, or subtracted properly.",
        ],
        code: {
          lang: "python", label: "datetime module",
          code: `from datetime import datetime, date, timedelta

# Current date and time
now   = datetime.now()
today = date.today()
print(now)
print(today)

# Create specific dates
birthday    = date(1995, 6, 15)
appointment = datetime(2024, 3, 20, 14, 30, 0)  # year,month,day,h,m,s

# Date arithmetic with timedelta
one_week  = timedelta(weeks=1)
next_week = today + one_week
print(f"Next week: {next_week}")

age_days = (today - birthday).days
print(f"Age in days: {age_days}")

# Formatting dates as strings
print(now.strftime("%Y-%m-%d"))         # 2024-01-15
print(now.strftime("%d/%m/%Y %H:%M"))   # 15/01/2024 14:30
print(now.strftime("%B %d, %Y"))        # January 15, 2024

# Parsing string to datetime
date_str = "2024-03-20"
parsed   = datetime.strptime(date_str, "%Y-%m-%d")
print(type(parsed))`,
          output: `2024-01-15 14:30:22.123456
2024-01-15
Next week: 2024-01-22
Age in days: 10440
2024-01-15
15/01/2024 14:30
January 15, 2024
<class 'datetime.datetime'>`,
        },
      },
      {
        heading: "collections -- powerful container types",
        body: [
          "The collections module provides specialised container types that go beyond the built-in list, dict, set, and tuple. Counter, defaultdict, namedtuple, and deque are the four you will use most.",
          "Counter is a dict subclass for counting hashable objects. defaultdict automatically creates a default value for missing keys. namedtuple creates tuple subclasses with named fields. deque (double-ended queue) supports fast appends and pops from both ends.",
        ],
        code: {
          lang: "python", label: "collections module",
          code: `from collections import Counter, defaultdict, namedtuple, deque

# Counter -- count anything
words  = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)
print(counts)
print(counts.most_common(2))
print(counts["apple"])

# Counter works on strings too
letter_count = Counter("mississippi")
print(letter_count.most_common(3))

# defaultdict -- no KeyError for missing keys
from collections import defaultdict
scores = defaultdict(list)
scores["Alice"].append(95)
scores["Alice"].append(87)
scores["Bob"].append(72)
print(dict(scores))

# namedtuple -- tuple with named fields
Point   = namedtuple("Point",   ["x", "y"])
Student = namedtuple("Student", ["name", "age", "grade"])

p = Point(10, 20)
s = Student("Alice", 20, "A")
print(f"Point: x={p.x}, y={p.y}")
print(f"Student: {s.name}, grade {s.grade}")
print(p[0], s[0])   # also works with index

# deque -- fast from both ends
q = deque([1, 2, 3])
q.appendleft(0)
q.append(4)
print(q)
print(q.popleft())`,
          output: `Counter({'apple': 3, 'banana': 2, 'cherry': 1})
[('apple', 3), ('banana', 2)]
3
[('s', 4), ('i', 4), ('p', 2)]
{'Alice': [95, 87], 'Bob': [72]}
Point: x=10, y=20
Student: Alice, grade A
10 Alice
deque([0, 1, 2, 3, 4])
0`,
        },
        tip: "defaultdict(list) is the go-to for grouping items. defaultdict(int) is perfect for counting (starts each count at 0 automatically). defaultdict(set) collects unique items per key.",
      },
      {
        heading: "os, sys, and pathlib -- system interaction",
        body: [
          "The os module provides operating system interfaces: file and directory operations, environment variables, process information. sys provides access to Python interpreter internals: command-line arguments, stdin/stdout, Python version.",
          "pathlib (covered in the File I/O lesson) is the modern replacement for many os.path functions. For new code, prefer pathlib for path operations and use os for everything else.",
        ],
        code: {
          lang: "python", label: "os and sys",
          code: `import os
import sys

# Current directory and navigation
print(os.getcwd())                    # current working directory
files = os.listdir(".")               # list files in current dir
print(files[:3])

# Environment variables
home = os.environ.get("HOME", "unknown")   # safe get with default
print(f"Home: {home}")

# Create and remove directories
os.makedirs("test/nested", exist_ok=True)   # create including parents
os.rmdir("test/nested")
os.rmdir("test")

# os.path utilities (older style -- prefer pathlib for new code)
path = "/home/user/documents/file.txt"
print(os.path.dirname(path))       # /home/user/documents
print(os.path.basename(path))      # file.txt
print(os.path.exists(path))        # True/False
print(os.path.splitext(path))      # ('/home/.../file', '.txt')

# sys -- Python interpreter info
print(sys.version)
print(sys.platform)
print(sys.argv)           # command-line arguments as a list`,
          output: `/home/user/learnhub
['app', 'lib', 'components']
Home: /home/user
/home/user/documents
file.txt
False
('/home/user/documents/file', '.txt')
3.12.0
linux
['script.py']`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "Which datetime method converts a datetime object to a formatted string?", options: ["strptime", "strformat", "strftime", "format"], answer: 2, explanation: "strftime (string format time) converts a datetime object to a string. strptime (string parse time) does the reverse -- parses a string into a datetime." },
      { type: "truefalse", q: "Counter('hello') counts the frequency of each character.", answer: true, explanation: "Counter works on any iterable including strings, counting each element. Counter('hello') gives Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})." },
      { type: "predict", q: "What prints?", code: `from collections import defaultdict\nd = defaultdict(int)\nd["a"] += 1\nd["a"] += 1\nd["b"] += 1\nprint(d["a"])\nprint(d["c"])`, answer: "2\n0", explanation: "d['a'] is incremented twice = 2. d['c'] was never set -- defaultdict(int) gives 0 for missing keys." },
      { type: "fillblank", q: "sys.________ contains the list of command-line arguments passed to a Python script.", answer: "argv", hint: "Argument vector -- a list where [0] is the script name" },
      { type: "mcq", q: "What does namedtuple give you over a regular tuple?", options: ["Faster access", "Named fields so you can access elements by name AND position", "Mutability", "More storage"], answer: 1, explanation: "namedtuple adds named fields to a regular tuple. You can access p.x or p[0]. The tuple is still immutable and memory-efficient." },
    ],
  },

  l35: {
    id: "l35", title: "Regular Expressions", duration: "10m",
    intro: "Regular expressions (regex) are a powerful mini-language for pattern matching in strings. They let you find, extract, validate, and replace text using concise patterns. Email validation, URL parsing, log file analysis -- regex handles all of these.",
    sections: [
      {
        heading: "Basic patterns and the re module",
        body: [
          "Python's re module provides regex functionality. The key functions: re.search() finds a pattern anywhere in the string. re.match() matches only at the start. re.findall() returns all matches as a list. re.sub() replaces matches with a string.",
          "Regex patterns use special characters: . matches any character. * means zero or more. + means one or more. ? means zero or one. ^ matches start of string. $ matches end. [] matches a character class. \d matches a digit. \w matches a word character. \s matches whitespace.",
          "Always use raw strings (r'...') for regex patterns. Without the r prefix, backslashes are interpreted by Python before regex sees them, causing confusing bugs.",
        ],
        code: {
          lang: "python", label: "re module basics",
          code: `import re

text = "Contact us at support@example.com or sales@company.org"

# re.search -- find first match anywhere
match = re.search(r"\w+@\w+\.\w+", text)
if match:
    print(f"Found: {match.group()}")
    print(f"At position: {match.start()}-{match.end()}")

# re.findall -- find ALL matches
emails = re.findall(r"\b[\w.-]+@[\w.-]+\.\w{2,}\b", text)
print(f"All emails: {emails}")

# re.match -- only matches at the START
print(re.match(r"Contact", text))   # Match object
print(re.match(r"support", text))   # None -- not at start

# re.sub -- replace matches
cleaned = re.sub(r"\d+", "NUM", "Call 123 or 456 today")
print(cleaned)

# Validate a pattern -- re.fullmatch
def is_valid_email(email):
    pattern = r"^[\w.-]+@[\w.-]+\.[a-z]{2,}$"
    return bool(re.fullmatch(pattern, email, re.IGNORECASE))

print(is_valid_email("user@example.com"))   # True
print(is_valid_email("not-an-email"))        # False
print(is_valid_email("user@.com"))           # False`,
          output: `Found: support@example.com
At position: 14-34
All emails: ['support@example.com', 'sales@company.org']
<re.Match object; span=(0, 7), match='Contact'>
None
Call NUM or NUM today
True
False
False`,
        },
      },
      {
        heading: "Groups, named groups, and re.compile",
        body: [
          "Parentheses in regex create groups -- subsections of the match you can extract separately. match.group(0) is the whole match. match.group(1) is the first group. Named groups (?P<name>...) let you access captures by name instead of number.",
          "re.compile() compiles a regex pattern into a reusable object. If you use the same pattern many times, compile it once for better performance and cleaner code.",
        ],
        code: {
          lang: "python", label: "groups and compile",
          code: `import re

# Groups -- extract parts of a match
date_pattern = re.compile(r"(\d{4})-(\d{2})-(\d{2})")
match = date_pattern.search("Event on 2024-03-20 at noon")
if match:
    print(f"Full: {match.group(0)}")
    print(f"Year: {match.group(1)}")
    print(f"Month: {match.group(2)}")
    print(f"Day: {match.group(3)}")

# Named groups -- clearer than numbers
named = re.compile(r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})")
match = named.search("Deadline: 2024-12-31")
if match:
    print(f"Year: {match.group('year')}")
    print(f"Month: {match.group('month')}")

# Extract all dates from a text
log = "2024-01-15: login. 2024-01-16: purchase. 2024-01-17: logout."
dates = date_pattern.findall(log)
print(f"All dates: {dates}")`,
          output: `Full: 2024-03-20
Year: 2024
Month: 03
Day: 20
Year: 2024
Month: 12
All dates: [('2024', '01', '15'), ('2024', '01', '16'), ('2024', '01', '17')]`,
        },
        tip: "Use regex101.com to build and test regex patterns interactively. Paste your pattern and test text, and it shows exactly what matches, with explanations for each part of the pattern.",
      },
    ],
    quiz: [
      { type: "mcq", q: "Which re function returns ALL non-overlapping matches as a list?", options: ["re.search()", "re.match()", "re.findall()", "re.fullmatch()"], answer: 2, explanation: "re.findall() returns all matches as a list of strings. re.search() returns only the first match. re.match() only checks the start of the string." },
      { type: "truefalse", q: "You should always use raw strings (r'...') for regex patterns.", answer: true, explanation: "Raw strings prevent Python from interpreting backslashes before regex sees them. Without r prefix, \d would need to be written as \\d." },
      { type: "fillblank", q: "To match one or more digits in regex, use the pattern: \______", answer: "d+", hint: "\d matches a digit, + means one or more" },
      { type: "predict", q: "What prints?", code: `import re\nresult = re.sub(r"\\d+", "N", "abc 123 def 456")\nprint(result)`, answer: "abc N def N", explanation: "re.sub replaces all digit sequences with N. 123 -> N, 456 -> N." },
      { type: "mcq", q: "What does re.compile() do?", options: ["Runs the regex immediately", "Compiles a pattern into a reusable object for better performance", "Validates that a pattern is correct", "Converts regex to Python code"], answer: 1, explanation: "re.compile() pre-compiles a pattern into a regex object. Reusing this object is faster than re-compiling the pattern on every call." },
    ],
  },

  l36: {
    id: "l36", title: "Final Project: CLI Todo App -- Part 1", duration: "14m",
    intro: "Everything you have learned comes together in this final project. We are building a complete command-line Todo application from scratch. Part 1 covers the project structure, data model, and file persistence.",
    sections: [
      {
        heading: "Project overview and structure",
        body: [
          "The Todo app will let users add tasks, list them, mark them complete, and delete them -- all from the command line. It persists data in a JSON file so tasks survive between sessions.",
          "We will build it in proper Python style: a data model class, a storage layer, business logic functions, and a CLI interface. Each part is separate so you could swap the JSON file for a database without touching the other parts.",
          "Create a new folder called todo_app and create these files inside it: todo.py (main entry point), model.py (Task class), storage.py (file operations), and cli.py (command-line interface).",
        ],
        code: {
          lang: "bash", label: "project setup",
          code: `mkdir todo_app
cd todo_app

# Create empty files
# Windows:
type nul > todo.py
type nul > model.py
type nul > storage.py
type nul > cli.py

# Mac/Linux:
touch todo.py model.py storage.py cli.py

# Final structure:
# todo_app/
# |-- todo.py      (entry point)
# |-- model.py     (Task class)
# |-- storage.py   (save/load from JSON)
# |-- cli.py       (handle commands)
# |-- tasks.json   (created automatically)`,
          output: `todo_app/
  todo.py
  model.py
  storage.py
  cli.py`,
        },
      },
      {
        heading: "The Task model -- model.py",
        body: [
          "The Task class represents a single todo item. It has an id (unique identifier), title (the task description), done (completion status), and created_at (when it was created).",
          "We use a dataclass decorator from the dataclasses module which automatically generates __init__, __repr__, and __eq__ based on the class attributes. This saves writing boilerplate.",
          "The to_dict() and from_dict() methods handle serialisation -- converting a Task to a plain dict (for JSON storage) and back. This is the bridge between Python objects and the JSON file.",
        ],
        code: {
          lang: "python", label: "model.py",
          code: `# model.py
from dataclasses import dataclass, field
from datetime import datetime
import uuid

@dataclass
class Task:
    title:      str
    done:       bool     = False
    id:         str      = field(default_factory=lambda: str(uuid.uuid4())[:8])
    created_at: str      = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))

    def to_dict(self) -> dict:
        return {
            "id":         self.id,
            "title":      self.title,
            "done":       self.done,
            "created_at": self.created_at,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Task":
        return cls(
            title      = data["title"],
            done       = data["done"],
            id         = data["id"],
            created_at = data["created_at"],
        )

    def __str__(self):
        status = "[x]" if self.done else "[ ]"
        return f"{status} {self.id}: {self.title}"


# Test the model
if __name__ == "__main__":
    t1 = Task("Learn Python")
    t2 = Task("Build a project", done=True)

    print(t1)
    print(t2)
    print(t1.to_dict())

    d = t1.to_dict()
    t3 = Task.from_dict(d)
    print(t3)`,
          output: `[ ] a3f2b1c4: Learn Python
[x] d5e6f7a8: Build a project
{'id': 'a3f2b1c4', 'title': 'Learn Python', 'done': False, 'created_at': '2024-01-15 14:30'}
[ ] a3f2b1c4: Learn Python`,
        },
        tip: "@dataclass is one of Python's most useful built-in decorators. It automatically generates __init__, __repr__, __eq__ and more based on class attributes. Use it whenever you are creating a class whose main purpose is storing data.",
      },
      {
        heading: "Storage layer -- storage.py",
        body: [
          "The storage module handles reading and writing tasks to a JSON file. It is completely separate from the Task class -- the Task class does not know or care how it gets stored. This separation is called the Single Responsibility Principle.",
          "If you later want to switch from JSON to a SQLite database, you only change storage.py. Everything else stays the same.",
        ],
        code: {
          lang: "python", label: "storage.py",
          code: `# storage.py
import json
from pathlib import Path
from model import Task

TASKS_FILE = Path("tasks.json")

def load_tasks() -> list[Task]:
    if not TASKS_FILE.exists():
        return []
    try:
        with open(TASKS_FILE, "r") as f:
            data = json.load(f)
        return [Task.from_dict(d) for d in data]
    except (json.JSONDecodeError, KeyError):
        print("Warning: tasks file is corrupted. Starting fresh.")
        return []

def save_tasks(tasks: list[Task]) -> None:
    with open(TASKS_FILE, "w") as f:
        json.dump([t.to_dict() for t in tasks], f, indent=2)

def add_task(title: str) -> Task:
    tasks  = load_tasks()
    task   = Task(title=title)
    tasks.append(task)
    save_tasks(tasks)
    return task

def complete_task(task_id: str) -> Task | None:
    tasks = load_tasks()
    for task in tasks:
        if task.id == task_id:
            task.done = True
            save_tasks(tasks)
            return task
    return None

def delete_task(task_id: str) -> bool:
    tasks     = load_tasks()
    new_tasks = [t for t in tasks if t.id != task_id]
    if len(new_tasks) == len(tasks):
        return False   # task not found
    save_tasks(new_tasks)
    return True`,
          output: `# No direct output -- this is a library module
# Used by cli.py and todo.py`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does the @dataclass decorator automatically generate?", options: ["Only __init__", "__init__, __repr__, and __eq__ based on class fields", "All dunder methods", "Only __str__"], answer: 1, explanation: "@dataclass generates __init__ (constructor), __repr__ (representation), and __eq__ (equality comparison) based on the annotated class fields." },
      { type: "truefalse", q: "The Task class in model.py should contain the code that reads and writes to the JSON file.", answer: false, explanation: "Separation of concerns: the Task class only models the data. Storage operations belong in storage.py. This makes each part independently testable and replaceable." },
      { type: "fillblank", q: "uuid.uuid4() generates a random ________ identifier guaranteed to be unique.", answer: "UUID", hint: "Universally Unique Identifier -- 128-bit random value" },
      { type: "predict", q: "What does Task.from_dict(task.to_dict()) produce?", code: `t = Task("Buy groceries")\nclone = Task.from_dict(t.to_dict())\nprint(clone.title)`, answer: "Buy groceries", explanation: "to_dict() converts Task to a dict. from_dict() converts it back. The round-trip preserves all data." },
      { type: "mcq", q: "Why is the storage layer separate from the Task model?", options: ["To make the code longer", "Single Responsibility: each module does one thing, making them independently changeable", "Python requires it", "For better performance"], answer: 1, explanation: "Separation of concerns means each module has one job. If you switch from JSON to a database, only storage.py changes. The Task model and CLI are unaffected." },
    ],
  },

  l37: {
    id: "l37", title: "Final Project: CLI Todo App -- Part 2", duration: "13m",
    intro: "In Part 2 we build the CLI interface and main entry point, wire everything together, add coloured output, and end up with a fully working command-line application you can actually use every day.",
    sections: [
      {
        heading: "CLI interface -- cli.py",
        body: [
          "The cli.py module handles the user-facing part: parsing commands, calling storage functions, and displaying results. It uses the sys.argv list to read command-line arguments.",
          "sys.argv is a list where sys.argv[0] is the script name, sys.argv[1] is the first argument, and so on. We parse this to determine which command was given (add, list, done, delete).",
        ],
        code: {
          lang: "python", label: "cli.py",
          code: `# cli.py
import sys
import storage

# ANSI colour codes for terminal output
GREEN  = "\x1b[92m"
RED    = "\x1b[91m"
YELLOW = "\x1b[93m"
CYAN   = "\x1b[96m"
BOLD   = "\x1b[1m"
RESET  = "\x1b[0m"

def print_header():
    print(f"\n{BOLD}{CYAN}  Todo List{RESET}")
    print(f"  {CYAN}{'--' * 20}{RESET}\n")

def print_task(task, number):
    if task.done:
        status = f"{GREEN}[x]{RESET}"
        title  = f"{GREEN}{task.title}{RESET}"
    else:
        status = f"{YELLOW}[ ]{RESET}"
        title  = task.title
    print(f"  {status} {number}. {title}")
    print(f"      {task.id} | {task.created_at}")

def cmd_list():
    tasks = storage.load_tasks()
    if not tasks:
        print(f"  {YELLOW}No tasks yet. Add one with: python todo.py add \"Task name\"{RESET}")
        return
    print_header()
    for i, task in enumerate(tasks, 1):
        print_task(task, i)
    done_count  = sum(1 for t in tasks if t.done)
    total_count = len(tasks)
    print(f"\n  {done_count}/{total_count} completed\n")

def cmd_add(title):
    task = storage.add_task(title)
    print(f"  {GREEN}Added:{RESET} {task.title} ({task.id})")

def cmd_done(task_id):
    task = storage.complete_task(task_id)
    if task:
        print(f"  {GREEN}Completed:{RESET} {task.title}")
    else:
        print(f"  {RED}Task not found: {task_id}{RESET}")

def cmd_delete(task_id):
    if storage.delete_task(task_id):
        print(f"  {GREEN}Deleted task {task_id}{RESET}")
    else:
        print(f"  {RED}Task not found: {task_id}{RESET}")

def print_usage():
    print(f"""
{BOLD}Usage:{RESET}
  python todo.py list              -- show all tasks
  python todo.py add "Task name"  -- add a new task
  python todo.py done <id>        -- mark task complete
  python todo.py delete <id>      -- delete a task
""")`,
          output: `# No direct output -- this is a library module`,
        },
      },
      {
        heading: "Entry point -- todo.py",
        body: [
          "todo.py is the main entry point -- the file you run directly. It reads sys.argv and calls the right function in cli.py based on the command given.",
          "The if __name__ == '__main__': guard ensures this routing code only runs when you execute the file directly, not when it is imported as a module.",
        ],
        code: {
          lang: "python", label: "todo.py",
          code: `# todo.py
import sys
import cli

def main():
    args = sys.argv[1:]   # skip the script name

    if not args:
        cli.print_usage()
        return

    command = args[0].lower()

    if command == "list":
        cli.cmd_list()

    elif command == "add":
        if len(args) < 2:
            print("Usage: python todo.py add \"Task description\"")
            return
        title = " ".join(args[1:])   # join in case title has spaces
        cli.cmd_add(title)

    elif command == "done":
        if len(args) < 2:
            print("Usage: python todo.py done <task-id>")
            return
        cli.cmd_done(args[1])

    elif command == "delete":
        if len(args) < 2:
            print("Usage: python todo.py delete <task-id>")
            return
        cli.cmd_delete(args[1])

    else:
        print(f"Unknown command: {command}")
        cli.print_usage()

if __name__ == "__main__":
    main()`,
          output: `# Run from terminal:
# python todo.py add "Learn Python"
# python todo.py add "Build a project"
# python todo.py list
# python todo.py done a3f2b1c4
# python todo.py delete a3f2b1c4`,
        },
      },
      {
        heading: "Running the complete app",
        body: [
          "With all four files in place, you have a fully functional command-line application. Run it from your terminal inside the todo_app folder.",
          "The app demonstrates almost everything from this course: classes and OOP (Task, @dataclass), file I/O (JSON storage), error handling (corrupted file), modules (separate files), f-strings, list comprehensions, sys.argv, pathlib, and more.",
        ],
        code: {
          lang: "bash", label: "using the app",
          code: `cd todo_app

python todo.py add "Learn Python basics"
# Added: Learn Python basics (a3f2b1c4)

python todo.py add "Build the Todo app"
# Added: Build the Todo app (b5c6d7e8)

python todo.py add "Deploy to GitHub"
# Added: Deploy to GitHub (f9a0b1c2)

python todo.py list
# Todo List
# ----------------------------------------
# [ ] 1. Learn Python basics
#       a3f2b1c4 | 2024-01-15 14:30
# [ ] 2. Build the Todo app
#       b5c6d7e8 | 2024-01-15 14:30
# [ ] 3. Deploy to GitHub
#       f9a0b1c2 | 2024-01-15 14:30
# 0/3 completed

python todo.py done a3f2b1c4
# Completed: Learn Python basics

python todo.py list
# [x] 1. Learn Python basics   (green)
# [ ] 2. Build the Todo app
# [ ] 3. Deploy to GitHub
# 1/3 completed`,
          output: `The app works! Tasks are saved to tasks.json and persist between sessions.`,
        },
        tip: "You can make todo.py executable on Mac/Linux by adding #!/usr/bin/env python3 as the first line and running chmod +x todo.py. Then you can run it as ./todo.py instead of python todo.py.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What is sys.argv[0] when you run: python todo.py add 'Buy milk'?", options: ["add", "Buy milk", "todo.py", "python"], answer: 2, explanation: "sys.argv[0] is always the script name. sys.argv[1] would be 'add'. sys.argv[2] would be 'Buy milk'." },
      { type: "truefalse", q: "ANSI escape codes like \x1b[92m produce coloured output in most terminals.", answer: true, explanation: "ANSI escape codes are standard sequences that terminals interpret as formatting commands. \x1b[92m is bright green, \x1b[0m resets to default." },
      { type: "predict", q: "What is args after this line if you run: python todo.py add Buy milk?", code: `import sys\nargs = sys.argv[1:]\nprint(args)`, answer: "['add', 'Buy', 'milk']", explanation: "sys.argv[1:] skips the script name. Each space-separated word on the command line is a separate list element." },
      { type: "fillblank", q: "To join the title words back into one string from args[1:], use: ' '.________(args[1:])", answer: "join", hint: "String method that concatenates a list of strings with a separator" },
      { type: "mcq", q: "Why does the todo app use separate model.py, storage.py, and cli.py files?", options: ["Python requires multiple files", "Separation of concerns -- each file has one responsibility", "To make it run faster", "To avoid name conflicts"], answer: 1, explanation: "Each file has one job: model.py defines data, storage.py handles persistence, cli.py handles user interaction. This makes each part independently maintainable and testable." },
    ],
  },

};

export function getLessonContent5(id: string): LessonContent | undefined {
  return lessons[id];
}