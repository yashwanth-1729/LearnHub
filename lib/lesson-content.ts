export type CodeBlock = { lang: string; code: string; label?: string };
export type LessonContent = {
  id: string;
  title: string;
  duration: string;
  free?: boolean;
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
    code?: CodeBlock;
    tip?: string;
    warning?: string;
  }>;
  quiz?: Array<{ q: string; options: string[]; answer: number }>;
  nextLesson?: string;
  prevLesson?: string;
};

const content: Record<string, LessonContent> = {

  l1: {
    id: "l1", title: "Welcome to the Course", duration: "5m", free: true,
    intro: "Welcome! In this course you will go from writing your very first line of Python all the way to building a real working application. No prior programming experience needed.",
    sections: [
      {
        heading: "What is Python?",
        body: "Python is a high-level, general-purpose programming language created by Guido van Rossum in 1991. It is famous for its clean, readable syntax that almost reads like plain English. Today it powers everything from Netflix recommendation systems and Instagram backends to NASA scientific research and machine learning models.",
      },
      {
        heading: "What will we build?",
        body: "By the end of this course you will have built a fully functional command-line Todo application. It stores tasks in a JSON file, supports adding, completing, and deleting tasks, and even has colored output. Every concept we learn feeds directly into that project.",
      },
      {
        heading: "How to use this course",
        body: "Each lesson has an explanation, code examples you can copy and run immediately, and a short quiz. The best way to learn is to type the code yourself rather than copy-pasting. Your fingers and brain learn together.",
        tip: "Open VS Code alongside this page and type every code example yourself. Even if it takes longer, you will remember it 10x better.",
      },
    ],
    nextLesson: "l2",
  },

  l2: {
    id: "l2", title: "Installing Python and VS Code", duration: "8m", free: true,
    intro: "Before writing any code we need two things installed: Python itself, and a good code editor. We will use Visual Studio Code which is free, fast, and has excellent Python support.",
    sections: [
      {
        heading: "Installing Python",
        body: "Go to python.org/downloads and download the latest Python 3 installer for your operating system. On Windows, run the installer and make sure to check 'Add Python to PATH' before clicking Install. On Mac you can also use Homebrew: brew install python3. On Linux: sudo apt install python3.",
        code: {
          lang: "bash",
          label: "Verify your installation",
          code: `python --version
# Expected output: Python 3.12.x

python -m pip --version
# Expected output: pip 24.x.x`,
        },
      },
      {
        heading: "Installing VS Code",
        body: "Download VS Code from code.visualstudio.com. After installing, open it and install the Python extension by Microsoft from the Extensions panel (Ctrl+Shift+X). This gives you syntax highlighting, autocompletion, and an integrated debugger.",
        tip: "Also install the 'Pylance' extension for much smarter autocompletion and type checking.",
      },
      {
        heading: "Your first Python file",
        body: "Create a new file called hello.py in VS Code. Type the code below and press F5 to run it. You should see the output appear in the terminal at the bottom.",
        code: {
          lang: "python",
          label: "hello.py",
          code: `print("Hello, World!")
print("I am learning Python!")`,
        },
      },
    ],
    nextLesson: "l3",
    prevLesson: "l1",
  },

  l3: {
    id: "l3", title: "Your First Python Script", duration: "7m", free: true,
    intro: "Now that Python is installed, let us write something more interesting than Hello World and understand what is actually happening when Python runs your code.",
    sections: [
      {
        heading: "The print() function",
        body: "print() is a built-in function that outputs text to the terminal. You can print strings, numbers, and even multiple values at once.",
        code: {
          lang: "python",
          label: "print basics",
          code: `print("Hello!")                    # prints a string
print(42)                         # prints a number
print("My age is", 20)            # prints multiple values
print("Line 1\\nLine 2")          # \\n is a newline character
print("Score:", 95, "out of 100") # prints three values`,
        },
      },
      {
        heading: "Getting input from the user",
        body: "input() pauses the program and waits for the user to type something and press Enter. It always returns a string.",
        code: {
          lang: "python",
          label: "user input",
          code: `name = input("What is your name? ")
print("Hello,", name)

age = input("How old are you? ")
print("You are", age, "years old")`,
        },
      },
      {
        heading: "Comments",
        body: "Comments are notes in your code that Python ignores. Use the # symbol to start a comment. Good comments explain WHY you are doing something, not just what.",
        code: {
          lang: "python",
          label: "comments",
          code: `# This is a comment - Python ignores this line
print("Hello!")  # This is an inline comment

# Always explain non-obvious logic
# We multiply by 1.18 to add 18% tax
price = 100 * 1.18`,
        },
        tip: "Write comments as if the next person reading your code is a tired programmer at midnight. Be kind to future-you.",
      },
    ],
    quiz: [
      { q: "What does print() do?", options: ["Stores a value", "Outputs text to the terminal", "Gets user input", "Creates a file"], answer: 1 },
      { q: "What character starts a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
    ],
    nextLesson: "l4",
    prevLesson: "l2",
  },

  l4: {
    id: "l4", title: "How Python Works Internally", duration: "9m", free: true,
    intro: "You do not need to understand CPython internals to use Python, but knowing the basics helps you debug issues and write better code.",
    sections: [
      {
        heading: "Interpreted vs Compiled",
        body: "Python is an interpreted language. When you run python hello.py, the Python interpreter reads your source code line by line, converts it to bytecode (.pyc files), and executes that bytecode on the Python Virtual Machine. This happens automatically and you never need to manually compile anything.",
      },
      {
        heading: "The Python execution model",
        body: "Python executes code from top to bottom, one statement at a time. If it encounters an error on line 5, lines 1-4 will already have run. This is important to understand when debugging.",
        code: {
          lang: "python",
          label: "execution order",
          code: `print("Line 1 runs first")   # runs
print("Line 2 runs second")  # runs
x = 10                        # runs
print("x =", x)              # runs
# print(undefined_var)       # would crash here, lines above already ran`,
        },
      },
      {
        heading: "Indentation matters",
        body: "Unlike most languages that use curly braces {}, Python uses indentation (spaces or tabs) to define code blocks. This is one of Python's most distinctive features. The standard is 4 spaces per indent level.",
        code: {
          lang: "python",
          label: "indentation",
          code: `if True:
    print("This is indented - inside the if block")
    print("This too")
print("This is NOT indented - outside the if block")`,
        },
        warning: "Never mix tabs and spaces for indentation. Always use 4 spaces. VS Code does this automatically when you press Tab.",
      },
    ],
    nextLesson: "l5",
    prevLesson: "l3",
  },

  l5: {
    id: "l5", title: "Variables and Assignment", duration: "11m",
    intro: "Variables are named containers that store data. Python makes working with variables incredibly simple compared to other languages.",
    sections: [
      {
        heading: "Creating variables",
        body: "In Python you create a variable simply by assigning a value to a name with =. There is no need to declare types. Python figures out the type automatically.",
        code: {
          lang: "python",
          label: "variables",
          code: `name = "Alice"
age = 25
height = 5.7
is_student = True

print(name)       # Alice
print(age)        # 25
print(height)     # 5.7
print(is_student) # True`,
        },
      },
      {
        heading: "Naming rules",
        body: "Variable names must start with a letter or underscore, can contain letters, numbers and underscores, and are case-sensitive. Use snake_case for variable names in Python.",
        code: {
          lang: "python",
          label: "naming conventions",
          code: `# Good names
first_name = "Alice"
total_score = 100
is_logged_in = False
_private_var = 42

# Bad names (will cause errors or are bad style)
# 2fast = True       # cannot start with a number
# my-var = 5         # hyphens not allowed
# class = "Python"   # 'class' is a reserved keyword`,
        },
        tip: "Use descriptive names. total_score is much better than ts or x. Your future self will thank you.",
      },
      {
        heading: "Multiple assignment",
        body: "Python lets you assign multiple variables in one line, or assign the same value to multiple variables at once.",
        code: {
          lang: "python",
          label: "multiple assignment",
          code: `# Assign multiple variables at once
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

# Swap values elegantly (unique to Python)
a, b = 10, 20
a, b = b, a
print(a, b)  # 20 10

# Same value to multiple variables
x = y = z = 0`,
        },
      },
    ],
    quiz: [
      { q: "Which variable name is valid in Python?", options: ["2name", "my-var", "first_name", "class"], answer: 2 },
      { q: "What does a, b = b, a do?", options: ["Deletes both variables", "Swaps the values of a and b", "Adds a and b", "Creates a tuple"], answer: 1 },
    ],
    nextLesson: "l6",
    prevLesson: "l4",
  },

  l6: {
    id: "l6", title: "Strings: Creation and Methods", duration: "14m",
    intro: "Strings are sequences of characters. They are one of the most used data types in Python and come with dozens of built-in methods.",
    sections: [
      {
        heading: "Creating strings",
        body: "Strings can be created with single quotes, double quotes, or triple quotes for multi-line strings. They are all equivalent.",
        code: {
          lang: "python",
          label: "string creation",
          code: `single = 'Hello'
double = "World"
multi  = '''This is a
multi-line string'''

# Escape characters
path    = "C:\\\\Users\\\\Alice"   # backslash
quote   = "She said \\"hi\\""     # quote inside string
newline = "Line1\\nLine2"        # newline`,
        },
      },
      {
        heading: "f-strings (the modern way)",
        body: "f-strings let you embed expressions directly inside strings. They are fast and easy to read. Always prefer f-strings over + concatenation.",
        code: {
          lang: "python",
          label: "f-strings",
          code: `name  = "Alice"
age   = 25
score = 95.5

# f-string: prefix with f and use {} for expressions
print(f"Hello, {name}!")
print(f"You are {age} years old")
print(f"Score: {score:.1f}%")  # .1f = 1 decimal place
print(f"Next year you will be {age + 1}")
print(f"Name in uppercase: {name.upper()}")`,
        },
      },
      {
        heading: "Essential string methods",
        body: "Strings have many built-in methods. Here are the ones you will use most often.",
        code: {
          lang: "python",
          label: "string methods",
          code: `s = "  Hello, World!  "

print(s.strip())          # "Hello, World!"   - remove whitespace
print(s.lower())          # "  hello, world!  "
print(s.upper())          # "  HELLO, WORLD!  "
print(s.replace("World", "Python"))  # "  Hello, Python!  "
print(s.split(","))       # ["  Hello", " World!  "]
print("hello".capitalize())  # "Hello"
print("hello world".title())  # "Hello World"
print("hello".startswith("he"))  # True
print("hello".endswith("lo"))    # True
print("hello world".find("world"))  # 6 (index)
print(len("hello"))       # 5 - number of characters`,
        },
        tip: "String methods do NOT modify the original string. They return a new string. Strings are immutable in Python.",
      },
    ],
    nextLesson: "l7",
    prevLesson: "l5",
  },

  l7: {
    id: "l7", title: "Numbers: int, float, complex", duration: "10m",
    intro: "Python handles numbers elegantly. You will mostly work with integers and floats, but it also supports complex numbers and arbitrary precision arithmetic.",
    sections: [
      {
        heading: "Integer and float basics",
        body: "int is a whole number with no decimal point. float has a decimal point. Python automatically upgrades int to float when needed.",
        code: {
          lang: "python",
          label: "numbers",
          code: `# Integers
age    = 25
score  = -10
big    = 1_000_000  # underscores for readability

# Floats
pi     = 3.14159
temp   = -17.5
sci    = 1.5e6      # scientific notation = 1500000.0

# Arithmetic operators
print(10 + 3)   # 13  addition
print(10 - 3)   # 7   subtraction
print(10 * 3)   # 30  multiplication
print(10 / 3)   # 3.3333...  true division (always float)
print(10 // 3)  # 3   floor division (integer result)
print(10 % 3)   # 1   modulo (remainder)
print(10 ** 3)  # 1000  exponentiation`,
        },
      },
      {
        heading: "The math module",
        body: "Python's built-in math module provides mathematical functions and constants.",
        code: {
          lang: "python",
          label: "math module",
          code: `import math

print(math.pi)           # 3.141592653589793
print(math.sqrt(16))     # 4.0
print(math.ceil(4.2))    # 5  round up
print(math.floor(4.9))   # 4  round down
print(math.abs(-5))      # 5  absolute value (also built-in: abs(-5))
print(round(3.14159, 2)) # 3.14  built-in round`,
        },
      },
      {
        heading: "Common pitfall: float precision",
        body: "Floats are stored in binary and have precision limits. This can cause surprising results.",
        code: {
          lang: "python",
          label: "float precision",
          code: `print(0.1 + 0.2)          # 0.30000000000000004 !!
print(0.1 + 0.2 == 0.3)   # False !!

# Fix: use round() for comparisons
print(round(0.1 + 0.2, 1) == 0.3)  # True

# Or use the decimal module for financial calculations
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))  # 0.3 exactly`,
        },
        warning: "Never use floats for money calculations. Use the decimal module or store amounts in cents as integers.",
      },
    ],
    nextLesson: "l8",
    prevLesson: "l6",
  },

  l8: {
    id: "l8", title: "Booleans and Comparisons", duration: "9m",
    intro: "Booleans represent True or False. They are the foundation of all decision-making in your programs.",
    sections: [
      {
        heading: "Boolean values and operators",
        body: "Python has two boolean values: True and False (capital T and F). The logical operators are and, or, and not.",
        code: {
          lang: "python",
          label: "booleans",
          code: `is_raining = True
has_umbrella = False

print(is_raining and has_umbrella)   # False (both must be True)
print(is_raining or has_umbrella)    # True  (at least one True)
print(not is_raining)                 # False (opposite)

# Short-circuit evaluation
# 'and' stops at first False, 'or' stops at first True
print(False and 1/0)   # False (division never evaluated!)
print(True  or  1/0)   # True  (division never evaluated!)`,
        },
      },
      {
        heading: "Comparison operators",
        body: "Comparison operators compare two values and return a boolean.",
        code: {
          lang: "python",
          label: "comparisons",
          code: `x = 10

print(x == 10)   # True   equal to
print(x != 5)    # True   not equal to
print(x > 5)     # True   greater than
print(x < 5)     # False  less than
print(x >= 10)   # True   greater than or equal
print(x <= 9)    # False  less than or equal

# Chained comparisons (unique to Python)
age = 25
print(18 <= age <= 65)  # True - is age between 18 and 65?`,
        },
      },
      {
        heading: "Truthiness",
        body: "In Python, many non-boolean values are considered truthy or falsy when used in a boolean context.",
        code: {
          lang: "python",
          label: "truthiness",
          code: `# Falsy values (evaluate to False)
print(bool(0))       # False
print(bool(0.0))     # False
print(bool(""))      # False - empty string
print(bool([]))      # False - empty list
print(bool(None))    # False

# Truthy values (evaluate to True)
print(bool(1))       # True
print(bool(-5))      # True (any non-zero number)
print(bool("hi"))    # True (non-empty string)
print(bool([1,2]))   # True (non-empty list)

# Practical use
name = input("Enter name: ")
if name:   # True if name is not empty
    print(f"Hello, {name}")`,
        },
        tip: "Use truthiness checks like 'if name:' instead of 'if name != \"\"'. It is more Pythonic.",
      },
    ],
    nextLesson: "l9",
    prevLesson: "l7",
  },

  l9: {
    id: "l9", title: "Type Conversion", duration: "8m",
    intro: "Sometimes you need to convert data from one type to another. Python makes this straightforward with built-in conversion functions.",
    sections: [
      {
        heading: "Type conversion functions",
        body: "Python provides int(), float(), str(), bool(), and list() to convert between types.",
        code: {
          lang: "python",
          label: "type conversion",
          code: `# String to number (very common with input())
age_str = "25"
age_int = int(age_str)
print(age_int + 5)    # 30

price_str = "9.99"
price     = float(price_str)
print(price * 2)      # 19.98

# Number to string
score = 95
label = "Score: " + str(score)   # must convert to join strings
print(label)

# Check type
print(type(42))        # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type("hello"))   # <class 'str'>
print(type(True))      # <class 'bool'>`,
        },
      },
      {
        heading: "The input() trap",
        body: "input() always returns a string. This is the most common mistake beginners make. You must convert it to a number before doing math.",
        code: {
          lang: "python",
          label: "input conversion",
          code: `# WRONG - this will concatenate strings, not add numbers
age = input("Enter your age: ")
print(age + 5)   # TypeError! cannot add str and int

# CORRECT - convert first
age = int(input("Enter your age: "))
print(age + 5)   # Works!

# Safe conversion with error handling
try:
    age = int(input("Enter your age: "))
    print(f"In 10 years you will be {age + 10}")
except ValueError:
    print("Please enter a valid number")`,
        },
        warning: "Always convert input() results before using them in calculations. This is the number one beginner mistake.",
      },
    ],
    quiz: [
      { q: "What does input() always return?", options: ["int", "float", "str", "bool"], answer: 2 },
      { q: "How do you convert the string '42' to an integer?", options: ["str(42)", "int('42')", "float('42')", "bool('42')"], answer: 1 },
    ],
    nextLesson: "l10",
    prevLesson: "l8",
  },

  l10: {
    id: "l10", title: "if, elif, and else", duration: "12m",
    intro: "Conditional statements let your program make decisions. This is where code starts to feel alive.",
    sections: [
      {
        heading: "Basic if statement",
        body: "The if statement runs a block of code only when a condition is True. The colon : and indentation are required.",
        code: {
          lang: "python",
          label: "if statement",
          code: `age = 20

if age >= 18:
    print("You are an adult")
    print("You can vote")

# Nothing here runs if age < 18
print("This always runs")`,
        },
      },
      {
        heading: "if / elif / else",
        body: "Use elif to check multiple conditions in sequence. Use else as a fallback when no conditions match.",
        code: {
          lang: "python",
          label: "if elif else",
          code: `score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is {grade}")`,
        },
      },
      {
        heading: "Ternary expression",
        body: "Python has a one-line if/else called a ternary expression. Great for simple assignments.",
        code: {
          lang: "python",
          label: "ternary",
          code: `age = 20

# One line if/else
status = "adult" if age >= 18 else "minor"
print(status)  # adult

# Same as:
if age >= 18:
    status = "adult"
else:
    status = "minor"`,
        },
        tip: "Use the ternary only for simple, readable cases. If the condition is complex, use a full if/else block.",
      },
    ],
    nextLesson: "l11",
    prevLesson: "l9",
  },

  l11: {
    id: "l11", title: "for Loops and range()", duration: "13m",
    intro: "Loops let you repeat actions without writing the same code over and over. The for loop is the most common loop in Python.",
    sections: [
      {
        heading: "Looping over a sequence",
        body: "A for loop iterates over any sequence: a list, string, tuple, or range.",
        code: {
          lang: "python",
          label: "for loops",
          code: `# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop over a string (each character)
for char in "Python":
    print(char)

# Loop over a range of numbers
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8  (step=2)
    print(i)`,
        },
      },
      {
        heading: "enumerate() and zip()",
        body: "enumerate() gives you both the index and value. zip() lets you loop over multiple sequences in parallel.",
        code: {
          lang: "python",
          label: "enumerate and zip",
          code: `fruits = ["apple", "banana", "cherry"]

# enumerate: get index AND value
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

# zip: loop two lists together
names  = ["Alice", "Bob", "Carol"]
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f"{name} scored {score}")`,
        },
      },
      {
        heading: "List comprehensions preview",
        body: "Python has a powerful one-line way to create lists from loops. We cover this in depth in the Data Structures module.",
        code: {
          lang: "python",
          label: "comprehension preview",
          code: `# Traditional loop to build a list
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# Same thing with a list comprehension
squares = [n ** 2 for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]`,
        },
        tip: "List comprehensions are one of Python's most loved features. Start getting used to seeing them.",
      },
    ],
    nextLesson: "l12",
    prevLesson: "l10",
  },

  l12: {
    id: "l12", title: "while Loops", duration: "10m",
    intro: "The while loop keeps running as long as a condition is True. Use it when you do not know in advance how many iterations you need.",
    sections: [
      {
        heading: "Basic while loop",
        body: "The while loop checks its condition before every iteration. When the condition becomes False, the loop stops.",
        code: {
          lang: "python",
          label: "while loop",
          code: `count = 0
while count < 5:
    print(f"count is {count}")
    count += 1    # MUST update the variable or loop runs forever!

print("Loop finished")`,
        },
        warning: "Always make sure the loop condition will eventually become False. Forgetting to update the variable causes an infinite loop. Press Ctrl+C to stop an infinite loop.",
      },
      {
        heading: "Input validation with while",
        body: "A very common pattern is using while to keep asking for input until the user provides a valid value.",
        code: {
          lang: "python",
          label: "input validation",
          code: `while True:
    age = input("Enter your age (1-120): ")
    if age.isdigit() and 1 <= int(age) <= 120:
        age = int(age)
        break   # exit the loop
    print("Invalid age. Please try again.")

print(f"Your age is {age}")`,
        },
      },
      {
        heading: "while vs for",
        body: "Use for when you know exactly what you are iterating over (a list, range, etc). Use while when the number of iterations depends on a condition.",
        code: {
          lang: "python",
          label: "when to use each",
          code: `# Use for: you know the collection
for item in shopping_list:
    buy(item)

# Use while: you do not know how many iterations
while not account.is_verified():
    account.send_verification_email()`,
        },
      },
    ],
    nextLesson: "l13",
    prevLesson: "l11",
  },

  l13: {
    id: "l13", title: "break, continue, and pass", duration: "8m",
    intro: "These three keywords give you fine-grained control over loop execution.",
    sections: [
      {
        heading: "break: exit the loop early",
        body: "break immediately exits the innermost loop it is in.",
        code: {
          lang: "python",
          label: "break",
          code: `# Find first even number
numbers = [1, 3, 7, 4, 9, 2, 6]
for n in numbers:
    if n % 2 == 0:
        print(f"First even number: {n}")
        break    # stop as soon as we find it
# Output: First even number: 4`,
        },
      },
      {
        heading: "continue: skip to next iteration",
        body: "continue skips the rest of the current iteration and moves to the next one.",
        code: {
          lang: "python",
          label: "continue",
          code: `# Print only odd numbers
for n in range(1, 11):
    if n % 2 == 0:
        continue    # skip even numbers
    print(n)
# Output: 1 3 5 7 9

# Skip empty lines when reading a file
for line in lines:
    if not line.strip():
        continue
    process(line)`,
        },
      },
      {
        heading: "pass: do nothing",
        body: "pass is a placeholder. Python requires something in a code block - pass fills that requirement while doing nothing.",
        code: {
          lang: "python",
          label: "pass",
          code: `# Placeholder for code you will write later
def calculate_tax():
    pass    # TODO: implement this

class User:
    pass    # empty class for now

for i in range(5):
    pass    # loop that does nothing (unusual but valid)`,
        },
        tip: "Use pass when you are sketching out program structure and want to come back and fill in the details later.",
      },
    ],
    nextLesson: "l14",
    prevLesson: "l12",
  },

  l14: {
    id: "l14", title: "Nested Loops and Patterns", duration: "11m",
    intro: "Nested loops are loops inside other loops. They are commonly used for 2D data and pattern generation.",
    sections: [
      {
        heading: "How nested loops work",
        body: "For each iteration of the outer loop, the inner loop runs completely. Think of it like a clock: the seconds hand (inner loop) goes all the way around before the minute hand (outer loop) moves one step.",
        code: {
          lang: "python",
          label: "nested loops",
          code: `for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()  # newline after each row

# Output:
# (0,0) (0,1) (0,2)
# (1,0) (1,1) (1,2)
# (2,0) (2,1) (2,2)`,
        },
      },
      {
        heading: "Multiplication table",
        body: "A classic nested loop example is printing a multiplication table.",
        code: {
          lang: "python",
          label: "multiplication table",
          code: `print("Multiplication Table")
print("-" * 30)

for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i*j:4}", end="")  # :4 pads to 4 characters wide
    print()

# Output:
#    1   2   3   4   5
#    2   4   6   8  10
#    3   6   9  12  15
#    4   8  12  16  20
#    5  10  15  20  25`,
        },
      },
      {
        heading: "Star pattern",
        body: "Printing patterns is a great exercise for understanding nested loops.",
        code: {
          lang: "python",
          label: "patterns",
          code: `n = 5

# Right triangle
for i in range(1, n+1):
    print("*" * i)

# Output:
# *
# **
# ***
# ****
# *****

# Pyramid
for i in range(1, n+1):
    spaces = " " * (n - i)
    stars  = "*" * (2*i - 1)
    print(spaces + stars)`,
        },
        tip: "Pattern problems are often asked in coding interviews. Practice them to sharpen your loop thinking.",
      },
    ],
    nextLesson: "l15",
    prevLesson: "l13",
  },

  l15: {
    id: "l15", title: "Defining and Calling Functions", duration: "12m",
    intro: "Functions let you package code into reusable named blocks. This is one of the most important concepts in all of programming.",
    sections: [
      {
        heading: "Defining and calling a function",
        body: "Use the def keyword to define a function. The function body is indented. Call the function by writing its name followed by parentheses.",
        code: {
          lang: "python",
          label: "functions",
          code: `def greet():
    print("Hello!")
    print("Welcome to LearnHub")

# Call the function (can call it multiple times)
greet()
greet()

def say_hello(name):     # name is a parameter
    print(f"Hello, {name}!")

say_hello("Alice")       # "Alice" is an argument
say_hello("Bob")`,
        },
      },
      {
        heading: "Return values",
        body: "Functions can return values using the return keyword. The returned value can be stored in a variable.",
        code: {
          lang: "python",
          label: "return values",
          code: `def add(a, b):
    return a + b

result = add(3, 4)
print(result)    # 7

def get_full_name(first, last):
    return f"{first} {last}"

name = get_full_name("John", "Doe")
print(name)    # John Doe

# Function without explicit return returns None
def nothing():
    pass

print(nothing())   # None`,
        },
      },
      {
        heading: "Docstrings",
        body: "A docstring is a string on the first line of a function that describes what it does. It is excellent practice and powers IDE help tooltips.",
        code: {
          lang: "python",
          label: "docstrings",
          code: `def calculate_bmi(weight_kg, height_m):
    # Calculate Body Mass Index.
    # Args: weight_kg in kg, height_m in meters
    # Returns: BMI rounded to 1 decimal
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

print(calculate_bmi(70, 1.75))   # 22.9`,
        },
        tip: "Write docstrings for every function you write. It forces you to think clearly about what the function does.",
      },
    ],
    nextLesson: "l16",
    prevLesson: "l14",
  },

};

export function getLessonContent(lessonId: string): LessonContent | undefined {
  return content[lessonId];
}

export function getAllLessonIds(): string[] {
  return Object.keys(content);
}