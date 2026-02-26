import type { LessonContent } from "./lesson-content";

const lessons: Record<string, LessonContent> = {

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l9 \u2014 Type Conversion
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l9: {
    id: "l9", title: "Type Conversion", duration: "8m",
    intro: "Data rarely comes in the exact type you need. Users type text, files contain strings, APIs return JSON. Type conversion \u2014 changing a value from one type to another \u2014 is something you will do in every real Python program.",
    sections: [
      {
        heading: "Why type conversion is necessary",
        body: [
          "Recall from lesson 3 that input() always returns a string. If a user types 25, you get the string '25', not the integer 25. These look the same to a human but Python treats them completely differently.",
          "The string '25' and the integer 25 cannot be added together \u2014 Python will raise a TypeError. You must explicitly convert between types when you need to perform operations across type boundaries.",
          "Python distinguishes between two kinds of conversion: implicit conversion (Python does it automatically, like converting int to float in mixed arithmetic) and explicit conversion (you do it manually using constructor functions).",
        ],
        code: {
          lang: "python", label: "why types matter",
          code:
`age_string = "25"    # what input() gives you
age_number = 25      # what you need for math

# These look the same but behave completely differently:
print(age_string + " years old")   # works \u2014 string concatenation
print(age_number + 5)              # works \u2014 integer addition

# This CRASHES with TypeError:
# print(age_string + 5)   # cannot add str and int!

# Python DOES do some implicit conversion:
print(5 + 2.0)        # int + float = float (automatic)
print(type(5 + 2.0))  # <class 'float'>`,
          output:
`25 years old
30
7.0
<class 'float'>`,
        },
      },
      {
        heading: "The four main conversion functions",
        body: [
          "Python provides built-in functions to convert between types: int(), float(), str(), and bool(). Each takes a value and returns a new value of the target type.",
          "int() converts to integer. It truncates floats (does NOT round \u2014 it just drops the decimal part). It can parse strings that look like integers. It cannot parse strings with decimal points or letters.",
          "float() converts to floating-point number. It can parse both integer strings ('25') and decimal strings ('3.14'). str() converts anything to its string representation. bool() converts to True or False using the truthiness rules from lesson 8.",
        ],
        code: {
          lang: "python", label: "conversion functions",
          code:
`# int() \u2014 convert to integer
print(int(3.9))       # 3   (truncates, does NOT round!)
print(int(3.1))       # 3   (same \u2014 always drops decimal)
print(int("42"))      # 42  (parse a string)
print(int(True))      # 1   (True = 1)
print(int(False))     # 0   (False = 0)
# int("3.14")         # ValueError! int() cannot parse decimals

# float() \u2014 convert to float
print(float(7))       # 7.0
print(float("3.14"))  # 3.14
print(float("7"))     # 7.0  (integers work too)
print(float(True))    # 1.0

# str() \u2014 convert anything to string
print(str(42))        # "42"
print(str(3.14))      # "3.14"
print(str(True))      # "True"
print(str(None))      # "None"
print(str([1,2,3]))   # "[1, 2, 3]"

# bool() \u2014 convert to boolean
print(bool(0))        # False
print(bool(42))       # True
print(bool(""))       # False
print(bool("hello"))  # True`,
          output:
`3
3
42
1
0
7.0
3.14
7.0
1.0
42
3.14
True
None
[1, 2, 3]
False
True
False
True`,
        },
        warning: "int(3.9) gives 3, not 4. int() always truncates toward zero \u2014 it does NOT round. Use round() if you want rounding, then int().",
      },
      {
        heading: "The input() pattern \u2014 the most common conversion",
        body: [
          "The most frequent use of type conversion is immediately converting input() results. The standard pattern is to wrap input() with the conversion function in one expression.",
          "However, this pattern is fragile \u2014 if the user types 'hello' when you asked for a number, int() raises a ValueError and your program crashes. Production code always handles this with try/except (covered in the Error Handling module). For now, trust the user.",
          "Here is a complete interactive example that demonstrates proper type conversion:",
        ],
        code: {
          lang: "python", label: "input conversion pattern",
          code:
`# Pattern: convert immediately at input time
age    = int(input("Enter your age: "))
height = float(input("Enter your height in metres: "))
name   = input("Enter your name: ")    # strings need no conversion

# Now you can do math
print(f"Hello {name}!")
print(f"In 10 years you will be {age + 10}")
print(f"Your height in cm is {height * 100:.0f}")
print(f"BMI would be weight / {height**2:.2f}")`,
          output:
`Enter your age: 22
Enter your height in metres: 1.75
Hello Alice!
In 10 years you will be 32
Your height in cm is 175
BMI would be weight / 3.06`,
        },
        examples: [
          {
            lang: "python", label: "safe conversion with try/except (preview)",
            code:
`# This is the production-safe version
# We cover try/except fully in the Error Handling module
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old")
except ValueError:
    print("That is not a valid number!")`,
            output:
`Enter your age: hello
That is not a valid number!`,
          },
        ],
        tip: "A quick way to check if a string is a valid integer before converting: use the .isdigit() method. '42'.isdigit() returns True. '3.14'.isdigit() returns False. 'hello'.isdigit() returns False.",
      },
      {
        heading: "Type checking with type() and isinstance()",
        body: [
          "Sometimes you need to check what type a value is before deciding what to do with it. type() returns the type object. isinstance() checks if a value is an instance of a given type and is generally preferred in real code.",
          "isinstance() is better than type() for type checking because it respects inheritance \u2014 an integer IS a number, and isinstance handles that. In practice, explicit type checking is less common in Python; the Pythonic approach is often to just try the operation and catch the error.",
        ],
        code: {
          lang: "python", label: "type checking",
          code:
`x = 42

# type() \u2014 exact type
print(type(x))           # <class 'int'>
print(type(x) == int)    # True
print(type(x) == float)  # False

# isinstance() \u2014 preferred method
print(isinstance(x, int))        # True
print(isinstance(x, float))      # False
print(isinstance(x, (int, float)))  # True \u2014 is it int OR float?

# Practical use: flexible function that accepts int or float
def double(value):
    if isinstance(value, (int, float)):
        return value * 2
    elif isinstance(value, str):
        return value * 2   # repeats the string!
    else:
        raise TypeError(f"Cannot double {type(value)}")

print(double(5))       # 10
print(double(2.5))     # 5.0
print(double("hi"))    # hihi`,
          output:
`<class 'int'>
True
False
True
False
True
10
5.0
hihi`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does int(3.9) return?", options: ["4 (rounded up)", "3 (truncated)", "3.9", "ValueError"], answer: 1, explanation: "int() always truncates toward zero \u2014 it drops the decimal part. int(3.9) = 3, not 4. Use round() for rounding." },
      { type: "predict", q: "What prints?", code: `x = "10"\ny = 5\nprint(int(x) + y)`, answer: "15", explanation: "int('10') converts the string '10' to integer 10. Then 10 + 5 = 15." },
      { type: "truefalse", q: "int('3.14') successfully converts '3.14' to the integer 3.", answer: false, explanation: "int() cannot parse strings with decimal points. int('3.14') raises a ValueError. You would need float('3.14') first, then int() on that." },
      { type: "fillblank", q: "To check if '42' is a valid integer string, use: '42'.__________()", answer: "isdigit", hint: "A string method that returns True if all characters are digits" },
      { type: "predict", q: "What prints?", code: `print(bool(0))\nprint(bool("0"))\nprint(bool([]))`, answer: "False\nTrue\nFalse", explanation: "bool(0) is False (zero). bool('0') is True (non-empty string \u2014 the character '0' makes it truthy). bool([]) is False (empty list)." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l10 \u2014 if, elif, else
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l10: {
    id: "l10", title: "if, elif, and else", duration: "12m",
    intro: "Conditional statements are the first control flow structure \u2014 they let your program make decisions and take different paths based on conditions. Without them, every program would do exactly the same thing every time it ran.",
    sections: [
      {
        heading: "The if statement \u2014 the most fundamental decision",
        body: [
          "An if statement evaluates a condition. If the condition is True (or truthy), the indented block below it runs. If it is False (or falsy), the block is skipped entirely.",
          "The syntax requires a colon after the condition and consistent indentation for the block. This is Python's way of grouping code \u2014 there are no braces.",
          "The condition can be any expression that evaluates to a boolean value: comparisons, boolean operators, function calls, or even just a variable (using truthiness).",
        ],
        code: {
          lang: "python", label: "basic if statement",
          code:
`temperature = 35

if temperature > 30:
    print("It is hot today!")
    print("Stay hydrated.")
    print("Wear sunscreen.")

print("This always runs, regardless of temperature.")

# The condition can be any boolean expression
age = 20
if age >= 18:
    print("You can vote.")

# Using truthiness
name = "Alice"
if name:            # True because name is not empty
    print(f"Hello, {name}!")

items = []
if not items:       # True because items is empty (falsy)
    print("Your cart is empty.")`,
          output:
`It is hot today!
Stay hydrated.
Wear sunscreen.
This always runs, regardless of temperature.
You can vote.
Hello, Alice!
Your cart is empty.`,
        },
      },
      {
        heading: "else \u2014 the fallback path",
        body: [
          "The else clause provides an alternative block that runs when the if condition is False. Every if can have at most one else. The else block ALWAYS runs when the if block does not.",
          "Think of if/else as a fork in the road \u2014 the program takes one path or the other, never both. After the fork, both paths merge back and execution continues normally.",
        ],
        code: {
          lang: "python", label: "if / else",
          code:
`score = 72

if score >= 60:
    print("You passed!")
    print(f"Your score: {score}")
else:
    print("You did not pass.")
    print(f"You need {60 - score} more points.")

print("Exam results processed.")

# Practical: categorise input
number = int(input("Enter a number: "))
if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")`,
          output:
`You passed!
Your score: 72
Exam results processed.
Enter a number: 7
7 is odd`,
        },
      },
      {
        heading: "elif \u2014 multiple conditions in sequence",
        body: [
          "elif (short for 'else if') lets you check multiple conditions in order. Python checks them from top to bottom and runs the first block whose condition is True. Once a match is found, all remaining elif and else branches are skipped entirely.",
          "You can have as many elif branches as you need. The else at the end is optional \u2014 it acts as a catch-all for when none of the conditions above matched.",
          "A critical performance note: conditions are checked in order. If you have many elif branches and the first one matches 90% of the time, put it first to avoid evaluating unnecessary conditions.",
        ],
        code: {
          lang: "python", label: "if / elif / else",
          code:
`score = int(input("Enter your score (0-100): "))

if score >= 90:
    grade = "A"
    message = "Excellent!"
elif score >= 80:
    grade = "B"
    message = "Great job!"
elif score >= 70:
    grade = "C"
    message = "Good work."
elif score >= 60:
    grade = "D"
    message = "You passed."
else:
    grade = "F"
    message = "Better luck next time."

print(f"Score: {score}/100")
print(f"Grade: {grade}")
print(f"Feedback: {message}")`,
          output:
`Enter your score (0-100): 85
Score: 85/100
Grade: B
Feedback: Great job!`,
        },
        tip: "Notice how we assign to the same variables (grade, message) in each branch, then print once at the end. This avoids repeating the print statement in every branch \u2014 a cleaner pattern.",
      },
      {
        heading: "The ternary expression and nested conditions",
        body: [
          "Python has a one-line conditional expression (often called a ternary operator): value_if_true if condition else value_if_false. It is useful for simple assignments but should not be overused \u2014 complex conditions are much harder to read in one line.",
          "Conditions can be nested \u2014 an if inside another if. Each level of nesting adds 4 spaces of indentation. Deep nesting (more than 2-3 levels) is a code smell suggesting you should refactor. Prefer early returns or combined conditions where possible.",
        ],
        code: {
          lang: "python", label: "ternary and nested",
          code:
`# Ternary expression \u2014 one-line if/else
age = 20
status = "adult" if age >= 18 else "minor"
print(status)

# Same as:
if age >= 18:
    status = "adult"
else:
    status = "minor"

# Nested conditions \u2014 ok for 2 levels
score = 85
if score >= 60:
    if score >= 90:
        print("Top performer and passed!")
    else:
        print("Passed but not top performer.")
else:
    print("Did not pass.")

# Better: use 'and' to combine instead of nesting
if score >= 60 and score < 90:
    print("Passed but not top performer.")`,
          output:
`adult
Passed but not top performer.
Passed but not top performer.`,
        },
        examples: [
          {
            lang: "python", label: "real-world example: login check",
            code:
`username = input("Username: ")
password = input("Password: ")

CORRECT_USER = "admin"
CORRECT_PASS = "secret123"

if username == CORRECT_USER and password == CORRECT_PASS:
    print("Access granted. Welcome!")
elif username == CORRECT_USER:
    print("Wrong password.")
elif password == CORRECT_PASS:
    print("Wrong username.")
else:
    print("Wrong username and password.")`,
            output:
`Username: admin
Password: wrong
Wrong password.`,
          },
        ],
      },
    ],
    quiz: [
      { type: "mcq", q: "If the first elif condition matches, what happens to the remaining elif and else blocks?", options: ["They all run", "They are all skipped", "Only the else runs", "Python raises an error"], answer: 1, explanation: "Once Python finds the first matching condition (if or elif), it runs that block and skips ALL remaining elif and else blocks." },
      { type: "predict", q: "What prints?", code: `x = 15\nif x > 20:\n    print("A")\nelif x > 10:\n    print("B")\nelif x > 5:\n    print("C")\nelse:\n    print("D")`, answer: "B", explanation: "x=15. x>20 is False. x>10 is True, so 'B' prints. The remaining elif and else are skipped." },
      { type: "truefalse", q: "An if statement must always have an else clause.", answer: false, explanation: "else is optional. An if can stand alone with no else. The else only runs when the if condition is False." },
      { type: "fillblank", q: `result = "yes" if 5 > 3 else "no"\nprint(result) outputs: ______`, answer: "yes", hint: "5 > 3 is True, so the value before 'if' is used" },
      { type: "predict", q: "What prints?", code: `score = 60\nif score >= 60:\n    if score >= 90:\n        print("A")\n    else:\n        print("C")\nelse:\n    print("F")`, answer: "C", explanation: "score=60 >= 60 so outer if runs. Inside: 60 >= 90 is False, so else runs: 'C'." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l11 \u2014 for loops and range()
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l11: {
    id: "l11", title: "for Loops and range()", duration: "13m",
    intro: "A loop lets you repeat a block of code multiple times without copy-pasting it. The for loop is Python's most common loop \u2014 it iterates over any sequence of values, one item at a time.",
    sections: [
      {
        heading: "How the for loop works",
        body: [
          "The for loop takes a sequence (a list, string, range, or any iterable) and assigns each item to a variable one at a time, running the indented block for each item.",
          "The loop variable (the name between for and in) is created automatically and updated each iteration. It is just a regular variable \u2014 you can use it, ignore it, or name it _ if you only care about repeating the block a number of times.",
          "The loop body is indented below the for line. When the indentation returns to the for level, the loop is over and execution continues with the next statement.",
        ],
        code: {
          lang: "python", label: "for loop basics",
          code:
`# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")

print("---")

# Loop over a string (each character)
for char in "Python":
    print(char, end=" ")
print()   # newline

print("---")

# Loop variable _ means "I do not care about the value"
# I just want to repeat 3 times
for _ in range(3):
    print("Hello!")`,
          output:
`I like apple
I like banana
I like cherry
---
P y t h o n
---
Hello!
Hello!
Hello!`,
        },
      },
      {
        heading: "range() \u2014 generating sequences of numbers",
        body: [
          "range() generates a sequence of integers. It is lazy \u2014 it does not create all numbers in memory at once, just computes the next one on demand. This makes range(1000000) perfectly fine memory-wise.",
          "range() has three forms: range(stop) generates 0 to stop-1. range(start, stop) generates start to stop-1. range(start, stop, step) generates start, start+step, start+2*step, up to but not including stop.",
          "The stop value is NEVER included. range(5) gives 0,1,2,3,4 \u2014 not 5. range(1,6) gives 1,2,3,4,5 \u2014 not 6. This is consistent with Python's slicing convention.",
        ],
        code: {
          lang: "python", label: "range() in depth",
          code:
`# range(stop) \u2014 0 to stop-1
print(list(range(5)))        # [0, 1, 2, 3, 4]

# range(start, stop) \u2014 start to stop-1
print(list(range(1, 6)))     # [1, 2, 3, 4, 5]
print(list(range(5, 10)))    # [5, 6, 7, 8, 9]

# range(start, stop, step)
print(list(range(0, 10, 2))) # [0, 2, 4, 6, 8] \u2014 even numbers
print(list(range(10, 0, -1)))# [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] \u2014 countdown!
print(list(range(0, -5, -1)))# [0, -1, -2, -3, -4]

# Practical loop with range
total = 0
for i in range(1, 11):    # 1 through 10
    total += i
print(f"Sum 1-10 = {total}")   # 55

# Multiplication table row
for i in range(1, 13):
    print(f"7 x {i:2} = {7*i:2}")`,
          output:
`[0, 1, 2, 3, 4]
[1, 2, 3, 4, 5]
[5, 6, 7, 8, 9]
[0, 2, 4, 6, 8]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
[0, -1, -2, -3, -4]
Sum 1-10 = 55
7 x  1 =  7
7 x  2 = 14
...
7 x 12 = 84`,
        },
        tip: "list(range(5)) converts the lazy range object to an actual list so you can see all its values. In a for loop you never need list() \u2014 the loop handles the iteration automatically.",
      },
      {
        heading: "enumerate() and zip() \u2014 powerful loop helpers",
        body: [
          "enumerate() wraps any iterable and yields (index, value) pairs. Use it whenever you need both the position and the value inside a loop. This is more Pythonic than manually tracking an index variable.",
          "zip() takes multiple iterables and combines them into pairs (or tuples). It stops at the shortest iterable. Use it to loop over two related sequences in parallel without using indices.",
          "Both functions return lazy iterators for efficiency \u2014 they compute each value on demand rather than creating the whole result upfront.",
        ],
        code: {
          lang: "python", label: "enumerate and zip",
          code:
`students = ["Alice", "Bob", "Carol", "Dave"]
scores   = [95, 87, 72, 91]

# Without enumerate \u2014 manually tracking index
for i in range(len(students)):
    print(f"{i+1}. {students[i]}")

print("---")

# WITH enumerate \u2014 cleaner and Pythonic
for i, name in enumerate(students):
    print(f"{i+1}. {name}")

print("---")

# enumerate with a start value
for rank, name in enumerate(students, start=1):
    print(f"Rank {rank}: {name}")

print("---")

# zip \u2014 loop two lists in parallel
for name, score in zip(students, scores):
    status = "PASS" if score >= 60 else "FAIL"
    print(f"{name}: {score} ({status})")`,
          output:
`1. Alice
2. Bob
3. Carol
4. Dave
---
1. Alice
2. Bob
3. Carol
4. Dave
---
Rank 1: Alice
Rank 2: Bob
Rank 3: Carol
Rank 4: Dave
---
Alice: 95 (PASS)
Bob: 87 (PASS)
Carol: 72 (PASS)
Dave: 91 (PASS)`,
        },
      },
      {
        heading: "List comprehensions \u2014 loops in one line",
        body: [
          "A list comprehension is a concise way to create a list using a for loop in a single expression. The pattern is [expression for item in iterable] and optionally [expression for item in iterable if condition].",
          "Comprehensions are faster than equivalent for loops (Python optimises them internally) and are considered the idiomatic Python way to build lists. Once you see the pattern, you will use it constantly.",
        ],
        code: {
          lang: "python", label: "list comprehensions",
          code:
`# Traditional loop
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
print(squares)

# Same with comprehension \u2014 one line, no append needed
squares = [n ** 2 for n in range(1, 6)]
print(squares)

# With a filter condition
evens = [n for n in range(1, 11) if n % 2 == 0]
print(evens)

# Transform a list of strings
names = ["alice", "bob", "carol"]
upper = [name.upper() for name in names]
print(upper)

# Nested: all pairs where a != b
pairs = [(a, b) for a in [1,2,3] for b in [1,2,3] if a != b]
print(pairs)`,
          output:
`[1, 4, 9, 16, 25]
[1, 4, 9, 16, 25]
[2, 4, 6, 8, 10]
['ALICE', 'BOB', 'CAROL']
[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]`,
        },
      },
    ],
    quiz: [
      { type: "predict", q: "What prints?", code: `for i in range(2, 8, 2):\n    print(i, end=" ")`, answer: "2 4 6", explanation: "range(2, 8, 2) starts at 2, stops before 8, steps by 2: 2, 4, 6." },
      { type: "truefalse", q: "range(5) includes the number 5.", answer: false, explanation: "range(stop) goes from 0 to stop-1. range(5) gives 0,1,2,3,4. The stop value is never included." },
      { type: "fillblank", q: "To get both index and value in a for loop, use the ________() function.", answer: "enumerate", hint: "It yields (index, value) pairs" },
      { type: "predict", q: "What is the result?", code: `result = [x**2 for x in range(1,5) if x % 2 != 0]\nprint(result)`, answer: "[1, 9]", explanation: "Odd numbers in range(1,5) are 1 and 3. 1**2=1, 3**2=9." },
      { type: "mcq", q: "zip(['a','b'], [1,2,3]) stops at which element?", options: ["After 'b' and 2, because the shortest iterable is exhausted", "After 'b' and 3, using all of the longer list", "Raises an error", "After 3 elements, padding the shorter list with None"], answer: 0, explanation: "zip() stops at the shortest iterable. ['a','b'] has 2 elements, so zip stops after 2 pairs: ('a',1) and ('b',2)." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l12 \u2014 while loops
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l12: {
    id: "l12", title: "while Loops", duration: "10m",
    intro: "The while loop repeats as long as a condition is True. Use it when you do not know in advance how many iterations you need \u2014 for example, reading user input until it is valid, or running a game until the player quits.",
    sections: [
      {
        heading: "How while loops work",
        body: [
          "A while loop checks its condition before every iteration. If the condition is True, the loop body runs. After the body completes, Python goes back to the top and checks the condition again. This repeats until the condition becomes False.",
          "The key responsibility is yours: you must ensure something inside the loop eventually makes the condition False. If the condition never becomes False, the loop runs forever \u2014 an infinite loop. Press Ctrl+C in the terminal to interrupt an infinite loop.",
          "The simplest while loop counts: start a counter at 0, check if it is less than some limit, increment the counter each iteration. This mimics what a for loop with range() does.",
        ],
        code: {
          lang: "python", label: "while loop basics",
          code:
`# Basic counting while loop
count = 0
while count < 5:
    print(f"count is {count}")
    count += 1      # CRITICAL: update the condition variable!

print("Loop finished!")
print(f"Final count: {count}")

# Countdown
n = 5
while n > 0:
    print(n, end=" ")
    n -= 1
print("Blast off!")`,
          output:
`count is 0
count is 1
count is 2
count is 3
count is 4
Loop finished!
Final count: 5
5 4 3 2 1 Blast off!`,
        },
        warning: "Always update the variable that the condition depends on. If you forget count += 1 in the example above, count stays 0 forever and the loop never ends.",
      },
      {
        heading: "Input validation \u2014 while's most important use case",
        body: [
          "The most common real-world use of while is validating user input. You keep asking until the user provides something acceptable. The pattern is: loop forever with while True, check inside, break when valid.",
          "This pattern is so common that it has a name: the 'ask-and-check' loop. The while True: combined with break inside is idiomatic Python for this situation.",
        ],
        code: {
          lang: "python", label: "input validation",
          code:
`# Keep asking until the user enters a valid age
while True:
    user_input = input("Enter your age (1-120): ")

    if not user_input.isdigit():
        print("Please enter a number.")
        continue    # skip rest of loop, go back to top

    age = int(user_input)
    if age < 1 or age > 120:
        print("Age must be between 1 and 120.")
        continue

    break   # valid input \u2014 exit the loop

print(f"Your age is {age}.")

# Another pattern: guess the number game
import random
secret = random.randint(1, 10)
attempts = 0

while True:
    guess = int(input("Guess (1-10): "))
    attempts += 1
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
    else:
        print(f"Correct! Took {attempts} attempts.")
        break`,
          output:
`Enter your age (1-120): abc
Please enter a number.
Enter your age (1-120): 0
Age must be between 1 and 120.
Enter your age (1-120): 25
Your age is 25.`,
        },
      },
      {
        heading: "for vs while \u2014 when to use each",
        body: [
          "for loops are for iterating over a known collection or a known number of times. while loops are for repeating until a condition changes. This is the core distinction.",
          "In practice, most loops in Python are for loops. While loops are used for: interactive input, polling/waiting, game loops, and any situation where you genuinely do not know how many iterations will be needed.",
          "One subtle edge case: the while loop variable persists after the loop ends, just like for loop variables. Python does not have block scoping like JavaScript's let/const.",
        ],
        code: {
          lang: "python", label: "for vs while comparison",
          code:
`# Use FOR when you know what you are iterating over
names = ["Alice", "Bob", "Carol"]
for name in names:              # clear: iterating over names
    print(name)

for i in range(10):             # clear: repeat exactly 10 times
    process(i)

# Use WHILE when you do not know how many iterations
attempts = 0
while not database.connected():   # repeat until connected
    database.retry()
    attempts += 1
    if attempts > 5:
        raise ConnectionError("Failed to connect")

# WHILE is also used for processing streams of data
while chunk := file.read(1024):   # read until empty
    process(chunk)`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What happens if a while loop's condition never becomes False?", options: ["Python raises a WhileError", "The loop stops after 1000 iterations", "An infinite loop runs until you interrupt it (Ctrl+C)", "Python detects it and exits gracefully"], answer: 2, explanation: "Python does not detect infinite loops. They run forever until you press Ctrl+C or the program is killed externally." },
      { type: "predict", q: "What prints?", code: `n = 1\nwhile n < 20:\n    n *= 2\nprint(n)`, answer: "32", explanation: "n doubles each time: 1, 2, 4, 8, 16, 32. 16 < 20 so it continues: n=32. 32 is not < 20 so loop stops. Prints 32." },
      { type: "truefalse", q: "while True: always creates an infinite loop with no way to exit.", answer: false, explanation: "while True: runs forever UNLESS you use break inside the loop. break immediately exits the loop, making while True: a controlled infinite loop." },
      { type: "fillblank", q: "The keyboard shortcut to interrupt an infinite loop in the terminal is Ctrl+___", answer: "C", hint: "The universal 'cancel' shortcut in terminals" },
      { type: "mcq", q: "Which loop type is best for: 'keep asking for input until the user types quit'?", options: ["for loop with range()", "for loop with enumerate()", "while loop", "No loop needed"], answer: 2, explanation: "You do not know how many times the user will give invalid input before typing 'quit'. This unknown-iteration-count situation is exactly what while is for." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l13 \u2014 break, continue, pass
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l13: {
    id: "l13", title: "break, continue, and pass", duration: "8m",
    intro: "Three keywords give you fine-grained control over what happens inside a loop. break exits the loop immediately. continue skips the rest of the current iteration. pass does absolutely nothing \u2014 it is a placeholder.",
    sections: [
      {
        heading: "break \u2014 exit the loop immediately",
        body: [
          "break jumps out of the innermost loop containing it, regardless of whether the loop condition is still True or there are more items to iterate. Execution continues with the first statement after the loop.",
          "break is most useful when searching for something \u2014 once you find it, there is no point continuing. It is also essential in while True: loops where break is the only exit.",
          "An important subtlety: break only exits ONE loop. If you have nested loops, break only exits the innermost loop. To exit multiple loops, you need a different technique (like a flag variable or restructuring with a function).",
        ],
        code: {
          lang: "python", label: "break in action",
          code:
`# Search: find first even number
numbers = [1, 7, 3, 4, 9, 2, 6]
for n in numbers:
    if n % 2 == 0:
        print(f"First even number: {n}")
        break       # stop as soon as we find it
    print(f"{n} is odd, keep looking...")

print("Search done.")

print("---")

# break only exits the innermost loop
for i in range(3):
    for j in range(3):
        if j == 1:
            break   # only exits the inner loop!
        print(f"i={i} j={j}")`,
          output:
`1 is odd, keep looking...
7 is odd, keep looking...
3 is odd, keep looking...
First even number: 4
Search done.
---
i=0 j=0
i=1 j=0
i=2 j=0`,
        },
      },
      {
        heading: "continue \u2014 skip to the next iteration",
        body: [
          "continue skips the rest of the current iteration's body and jumps back to the loop's condition check (for while) or the next item (for for). The loop itself does NOT stop.",
          "continue is useful for filtering \u2014 skipping items you do not want to process. It can make code cleaner by avoiding deeply nested if statements.",
          "A key observation: using continue often lets you 'guard' at the top of a loop body and avoid indenting the main logic. This is called a 'guard clause' or 'early continue' pattern.",
        ],
        code: {
          lang: "python", label: "continue in action",
          code:
`# Skip negative numbers
numbers = [3, -1, 7, -5, 2, -8, 4]
print("Positive numbers only:")
for n in numbers:
    if n < 0:
        continue    # skip negatives, go to next iteration
    print(n, end=" ")
print()

# Guard clause pattern \u2014 cleaner than deep nesting
users = [
    {"name": "Alice", "active": True,  "age": 25},
    {"name": "Bob",   "active": False, "age": 30},
    {"name": "Carol", "active": True,  "age": 16},
    {"name": "Dave",  "active": True,  "age": 22},
]

print("Active adult users:")
for user in users:
    if not user["active"]:
        continue        # skip inactive
    if user["age"] < 18:
        continue        # skip minors
    print(f"  {user['name']}, age {user['age']}")`,
          output:
`Positive numbers only:
3 7 2 4
Active adult users:
  Alice, age 25
  Dave, age 22`,
        },
        tip: "The 'early continue' guard clause pattern is preferred over: 'for user in users: if user[active] and user[age] >= 18: # main logic'. The guard pattern is flatter and easier to read.",
      },
      {
        heading: "pass \u2014 the deliberate do-nothing",
        body: [
          "pass is a statement that does absolutely nothing. Python requires that every code block (after if, for, while, def, class) contains at least one statement. pass fills that requirement when you intentionally want nothing to happen.",
          "The main use cases are: placeholder for code you will write later, empty class or function definitions during design, and handling an exception silently (though this is often bad practice \u2014 at minimum add a comment explaining why).",
        ],
        code: {
          lang: "python", label: "pass use cases",
          code:
`# Placeholder during development
def calculate_tax(amount):
    pass    # TODO: implement tax calculation

def send_email(address, subject, body):
    pass    # TODO: connect to email server

class UserProfile:
    pass    # TODO: add attributes and methods

# Empty except block (use sparingly, document why)
try:
    result = int("not a number")
except ValueError:
    pass    # We expect this to fail sometimes, that's ok

# for loop body that does nothing
# (unusual but syntactically required)
for _ in range(5):
    pass

print("All done")`,
          output: `All done`,
        },
        warning: "Empty except: pass is dangerous because it silently swallows ALL errors, including ones you did not intend to ignore. Always specify the exception type you expect, like except ValueError: pass.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does break do in a nested loop?", options: ["Exits all loops", "Exits only the innermost loop", "Exits the outermost loop", "Pauses the loop"], answer: 1, explanation: "break only exits the innermost (closest enclosing) loop. To exit multiple loops, use a flag variable or refactor into a function." },
      { type: "predict", q: "What prints?", code: `for i in range(5):\n    if i == 3:\n        continue\n    print(i, end=" ")`, answer: "0 1 2 4", explanation: "When i=3, continue skips the print and goes to the next iteration. So 3 is never printed." },
      { type: "truefalse", q: "pass raises an error when Python executes it.", answer: false, explanation: "pass does absolutely nothing. It is a valid statement that Python executes and then immediately moves to the next line." },
      { type: "fillblank", q: "To exit a while True: loop, use the ________ keyword.", answer: "break", hint: "It immediately exits the innermost loop" },
      { type: "mcq", q: "When would you use continue instead of break?", options: ["When you want to exit the loop entirely", "When you want to skip the current item but keep looping", "When you want to do nothing", "When you have a syntax error to suppress"], answer: 1, explanation: "continue skips to the next iteration while keeping the loop running. break exits the loop entirely. Use continue for filtering, break for early exit." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l14 \u2014 Nested Loops
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l14: {
    id: "l14", title: "Nested Loops and Patterns", duration: "11m",
    intro: "A nested loop is a loop inside another loop. For every single iteration of the outer loop, the inner loop runs completely from start to finish. This creates powerful patterns for working with 2D data, combinations, and grids.",
    sections: [
      {
        heading: "How nested loops execute",
        body: [
          "Think of nested loops like the hands of a clock. The outer loop is the minute hand \u2014 it advances slowly. The inner loop is the second hand \u2014 it makes a full revolution every time the minute hand moves once.",
          "Concretely: if the outer loop runs 3 times and the inner loop runs 4 times, the inner loop body runs 3 \u00D7 4 = 12 times total. For large inputs, nested loops can be slow \u2014 O(n\u00B2) complexity. Always ask: 'Is there a way to solve this with a single loop?'",
          "The key to reading nested loops: start with the outer loop's current value, then trace through the entire inner loop, then advance the outer loop by one.",
        ],
        code: {
          lang: "python", label: "nested loop execution",
          code:
`# Outer: 3 iterations. Inner: 3 iterations. Total: 9 iterations.
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end="  ")
    print()   # newline after each row of inner loop

print("---")

# Counting total iterations
count = 0
for i in range(4):
    for j in range(3):
        count += 1
print(f"Total iterations: {count}")   # 4 * 3 = 12`,
          output:
`(0,0)  (0,1)  (0,2)
(1,0)  (1,1)  (1,2)
(2,0)  (2,1)  (2,2)
---
Total iterations: 12`,
        },
      },
      {
        heading: "Multiplication table \u2014 a classic application",
        body: [
          "A multiplication table is the textbook example of nested loops because both dimensions (rows and columns) need to vary independently. The outer loop controls the row, the inner loop controls the column.",
          "The string formatting trick {:3} pads a number to a minimum width of 3 characters, aligning the columns neatly even when numbers have different digit counts.",
        ],
        code: {
          lang: "python", label: "multiplication table",
          code:
`# Multiplication table 1-5
print("   ", end="")
for j in range(1, 6):
    print(f"{j:4}", end="")
print()
print("   " + "-" * 20)

for i in range(1, 6):
    print(f"{i:2}|", end="")
    for j in range(1, 6):
        print(f"{i*j:4}", end="")
    print()`,
          output:
`       1   2   3   4   5
   --------------------
 1|   1   2   3   4   5
 2|   2   4   6   8  10
 3|   3   6   9  12  15
 4|   4   8  12  16  20
 5|   5  10  15  20  25`,
        },
      },
      {
        heading: "Star patterns \u2014 training your loop thinking",
        body: [
          "Pattern printing exercises are common in programming education and job interviews. They force you to think precisely about what changes with each iteration. The key is to relate the pattern dimension to the loop variable.",
          "For a right triangle with n rows: row i has i stars. For a pyramid: row i has (n-i) spaces and (2i-1) stars. Work out the formula for one row first, then put it in the loop.",
        ],
        code: {
          lang: "python", label: "star patterns",
          code:
`n = 5

# Pattern 1: Right triangle
print("Right triangle:")
for i in range(1, n+1):
    print("*" * i)

print()

# Pattern 2: Inverted triangle
print("Inverted:")
for i in range(n, 0, -1):
    print("*" * i)

print()

# Pattern 3: Pyramid
print("Pyramid:")
for i in range(1, n+1):
    spaces = " " * (n - i)
    stars  = "*" * (2*i - 1)
    print(spaces + stars)`,
          output:
`Right triangle:
*
**
***
****
*****

Inverted:
*****
****
***
**
*

Pyramid:
    *
   ***
  *****
 *******
*********`,
        },
        tip: "When solving pattern problems, start by writing out what each row should look like, then find the mathematical relationship between the row number and the pattern. Test with n=3 first (smaller is easier to trace).",
      },
      {
        heading: "Working with 2D lists",
        body: [
          "Nested loops are the natural way to process 2D data \u2014 grids, matrices, spreadsheets, game boards. A 2D list is a list of lists. The outer index selects the row, the inner index selects the column.",
          "List comprehensions extend to 2D as well. A 2D comprehension uses two for clauses. The order matters: outer loop first, inner loop second.",
        ],
        code: {
          lang: "python", label: "2D lists with nested loops",
          code:
`# A 3x3 grid
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

# Print each row
for row in grid:
    for cell in row:
        print(f"{cell:3}", end="")
    print()

print("---")

# Access by index
print(f"grid[1][2] = {grid[1][2]}")   # row 1, col 2

# Sum all elements
total = sum(cell for row in grid for cell in row)
print(f"Sum = {total}")

# Transpose with list comprehension
transposed = [[grid[r][c] for r in range(3)] for c in range(3)]
for row in transposed:
    print(row)`,
          output:
`  1  2  3
  4  5  6
  7  8  9
---
grid[1][2] = 6
Sum = 45
[1, 4, 7]
[2, 5, 8]
[3, 6, 9]`,
        },
      },
    ],
    quiz: [
      { type: "predict", q: "How many times does 'hi' print?", code: `for i in range(3):\n    for j in range(4):\n        print("hi")`, answer: "12", explanation: "Outer loop: 3 iterations. Inner loop: 4 iterations each. Total: 3 * 4 = 12." },
      { type: "mcq", q: "In a nested loop, when does the outer loop advance to its next iteration?", options: ["Every time the inner loop body runs", "After the inner loop completes one full cycle", "Simultaneously with the inner loop", "After break is called"], answer: 1, explanation: "The outer loop advances ONCE per complete run of the inner loop. The inner loop must finish all its iterations before the outer loop moves forward." },
      { type: "predict", q: "What prints?", code: `for i in range(1, 4):\n    print("*" * i)`, answer: "*\n**\n***", explanation: "i=1: one star. i=2: two stars. i=3: three stars. Each on its own line." },
      { type: "truefalse", q: "break inside an inner loop exits both the inner and outer loops.", answer: false, explanation: "break only exits the innermost (directly enclosing) loop. The outer loop continues running." },
      { type: "fillblank", q: "A nested loop with outer range(5) and inner range(5) runs the body __ times total.", answer: "25", hint: "Multiply the number of iterations: 5 * 5" },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // l15 \u2014 Defining Functions
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  l15: {
    id: "l15", title: "Defining and Calling Functions", duration: "12m",
    intro: "Functions are the most important tool for writing good code. They let you package a block of code under a name, reuse it anywhere, and think about your program in terms of what it does rather than how it does it line by line.",
    sections: [
      {
        heading: "Why functions exist \u2014 the DRY principle",
        body: [
          "DRY stands for 'Don't Repeat Yourself'. Whenever you find yourself copy-pasting code, that is a signal to write a function. Functions serve three purposes: reusability (write once, call many times), abstraction (hide complexity behind a name), and testability (functions are easy to test in isolation).",
          "Without functions, programs become impossible to maintain. A bug in duplicated code must be fixed in every copy. A function lets you fix it in one place.",
          "Here is the core syntax: use the def keyword, then the function name, then parentheses (with any parameters), then a colon. The indented block below is the function body.",
        ],
        code: {
          lang: "python", label: "defining and calling",
          code:
`# Define a function
def greet():
    print("Hello!")
    print("Welcome to LearnHub.")

# Call it \u2014 can call multiple times
greet()
greet()
greet()

# Without a function, you would repeat the two print lines
# every time you wanted to greet someone \u2014 messy and error-prone

def describe_python():
    print("Python is a high-level language.")
    print("Created in 1991 by Guido van Rossum.")
    print("Known for readability and versatility.")

describe_python()`,
          output:
`Hello!
Welcome to LearnHub.
Hello!
Welcome to LearnHub.
Hello!
Welcome to LearnHub.
Python is a high-level language.
Created in 1991 by Guido van Rossum.
Known for readability and versatility.`,
        },
      },
      {
        heading: "Parameters and arguments \u2014 passing data in",
        body: [
          "A parameter is a variable name listed in the function definition (inside the parentheses). An argument is the actual value you pass when calling the function. Many people use these terms interchangeably, but the distinction is worth knowing.",
          "When you call a function with an argument, Python creates the parameter variable inside the function and assigns the argument value to it. The parameter only exists inside the function \u2014 it is a local variable.",
          "Functions can take multiple parameters separated by commas. You can also give parameters default values, making them optional \u2014 if the caller does not provide them, the default is used.",
        ],
        code: {
          lang: "python", label: "parameters and arguments",
          code:
`# One parameter
def greet(name):           # name is the PARAMETER
    print(f"Hello, {name}!")

greet("Alice")             # "Alice" is the ARGUMENT
greet("Bob")
greet("World")

# Multiple parameters
def describe(name, age, city):
    print(f"{name} is {age} years old, lives in {city}.")

describe("Alice", 25, "London")
describe("Bob", 30, "Paris")

# Default parameter values
def power(base, exponent=2):    # exponent defaults to 2
    return base ** exponent

print(power(5))       # 25  (exponent defaults to 2)
print(power(5, 3))    # 125 (exponent = 3)
print(power(2, 10))   # 1024`,
          output:
`Hello, Alice!
Hello, Bob!
Hello, World!
Alice is 25 years old, lives in London.
Bob is 30 years old, lives in Paris.
25
125
1024`,
        },
      },
      {
        heading: "return \u2014 getting data back out",
        body: [
          "A function can send a value back to the caller using the return keyword. The caller can use this value \u2014 store it in a variable, pass it to another function, print it, or use it in an expression.",
          "return immediately exits the function. Any code after return in the same block never runs. A function without a return statement (or with a bare return) returns None.",
          "Functions that return values are the building blocks of larger computations. You can chain them: result = process(clean(load(data))). Each function does one thing well and returns a value for the next to use.",
        ],
        code: {
          lang: "python", label: "return values",
          code:
`def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# Use return values
result = add(10, 5)
print(result)

# Use directly in expressions
print(add(3, 4) * multiply(2, 5))   # 7 * 10 = 70

# Chain functions
def square(n):
    return n ** 2

def double(n):
    return n * 2

print(double(square(3)))   # double(9) = 18

# Functions without return give None
def say_hi():
    print("Hi!")

x = say_hi()     # function runs and prints
print(x)         # but x is None

# return exits immediately
def first_positive(numbers):
    for n in numbers:
        if n > 0:
            return n     # exits as soon as found
    return None          # only reached if no positive found

print(first_positive([-1, -2, 3, 4]))  # 3
print(first_positive([-1, -2, -3]))    # None`,
          output:
`15
70
18
Hi!
None
3
None`,
        },
        tip: "A function should ideally do one thing and do it well. If you find yourself writing a function that does three different things, consider splitting it into three smaller functions. Small focused functions are easier to test, debug, and reuse.",
      },
      {
        heading: "Docstrings \u2014 documenting your functions",
        body: [
          "A docstring is a string literal on the first line of a function body. It documents what the function does, its parameters, and its return value. Python uses it to generate help text.",
          "Docstrings are accessible at runtime via the __doc__ attribute and via the built-in help() function. IDEs and editors display docstrings as tooltips when you hover over a function call.",
          "Writing a docstring forces you to think clearly about what your function actually does. If you cannot explain it in one or two sentences, your function probably does too much.",
        ],
        code: {
          lang: "python", label: "docstrings",
          code:
`def calculate_bmi(weight_kg, height_m):
    # A docstring goes here \u2014 first line of the function body
    # (using a comment here to avoid triple-quote parsing issues)
    # In real code: write a proper triple-quoted docstring
    # explaining parameters, return value, and examples
    if height_m <= 0:
        raise ValueError("Height must be positive")
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

# Call it
bmi = calculate_bmi(70, 1.75)
print(f"BMI: {bmi}")

category = "Healthy" if 18.5 <= bmi <= 24.9 else "Other"
print(f"Category: {category}")

# Another well-documented function
def celsius_to_fahrenheit(celsius):
    # Convert Celsius to Fahrenheit
    # Formula: F = C * 9/5 + 32
    return celsius * 9/5 + 32

print(f"0C = {celsius_to_fahrenheit(0)}F")
print(f"100C = {celsius_to_fahrenheit(100)}F")
print(f"37C = {celsius_to_fahrenheit(37):.1f}F")`,
          output:
`BMI: 22.9
Category: Healthy
0C = 32.0F
100C = 212.0F
37C = 98.6F`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What is the difference between a parameter and an argument?", options: ["They are the same thing", "A parameter is in the function definition; an argument is the value passed when calling", "An argument is in the function definition; a parameter is the value passed", "Parameters are for numbers, arguments for strings"], answer: 1, explanation: "Parameter: the variable name in def f(name). Argument: the value you pass when calling f('Alice'). 'name' is the parameter, 'Alice' is the argument." },
      { type: "predict", q: "What prints?", code: `def f(x, y=10):\n    return x + y\nprint(f(5))\nprint(f(5, 3))`, answer: "15\n8", explanation: "f(5): x=5, y=10 (default). Returns 15. f(5,3): x=5, y=3 (overrides default). Returns 8." },
      { type: "truefalse", q: "A function without a return statement returns None.", answer: true, explanation: "If a function has no return statement (or just 'return' with no value), it implicitly returns None." },
      { type: "fillblank", q: "The keyword used to define a function in Python is ___", answer: "def", hint: "Short for 'define'" },
      { type: "predict", q: "What prints?", code: `def double(n):\n    return n * 2\n\ndef square(n):\n    return n ** 2\n\nprint(double(square(3)))`, answer: "18", explanation: "square(3) = 9. double(9) = 18. Functions are evaluated inside-out." },
    ],
  },

};

export function getLessonContent3(id: string): LessonContent | undefined {
  return lessons[id];
}