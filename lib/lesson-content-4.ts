import type { LessonContent } from "./lesson-content";

const lessons: Record<string, LessonContent> = {

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // MODULE 6 \u2014 OBJECT-ORIENTED PROGRAMMING
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l26: {
    id: "l26", title: "Classes and Objects", duration: "15m",
    intro: "Object-Oriented Programming (OOP) is a way of structuring code around 'objects' \u2014 bundles of data and the functions that operate on that data. Once you understand classes, you will see them everywhere: in Django models, PyGame sprites, data science pipelines, and your own projects.",
    sections: [
      {
        heading: "What is a class and why do we need one?",
        body: [
          "A class is a blueprint. An object is something built from that blueprint. Think of a class as the cookie cutter and objects as the cookies \u2014 each cookie has the same shape (same attributes, same methods) but can have different values (different flavours, sizes).",
          "Before classes, if you wanted to represent 100 students in a program, you would need 100 separate variables for each piece of data \u2014 100 names, 100 ages, 100 grades. A class lets you bundle all of a student's data into one object and create as many as you need.",
          "Python uses the 'class' keyword to define a class. By convention, class names use CamelCase (capital first letter of each word). Everything inside the class is indented one level.",
        ],
        code: {
          lang: "python", label: "first class",
          code:
`# Define the class (the blueprint)
class Dog:
    # __init__ is the constructor \u2014 runs when you create a new Dog
    def __init__(self, name, breed, age):
        # self.name, self.breed, self.age are INSTANCE ATTRIBUTES
        # Each Dog object gets its own copy of these
        self.name  = name
        self.breed = breed
        self.age   = age

    def bark(self):
        print(f"{self.name} says: Woof!")

    def describe(self):
        print(f"{self.name} is a {self.age}-year-old {self.breed}.")

# Create objects (instances) from the class
dog1 = Dog("Rex",   "Labrador", 3)
dog2 = Dog("Bella", "Poodle",   5)

# Each object has its own data
dog1.bark()
dog2.bark()
dog1.describe()
dog2.describe()

# Access attributes directly
print(dog1.name)
print(dog2.age)`,
          output:
`Rex says: Woof!
Bella says: Woof!
Rex is a 3-year-old Labrador.
Bella is a 5-year-old Poodle.
Rex
5`,
        },
      },
      {
        heading: "Understanding self",
        body: [
          "Every method in a class takes 'self' as its first parameter. 'self' refers to the specific object the method is being called on. When you call dog1.bark(), Python automatically passes dog1 as the 'self' argument.",
          "You do not pass 'self' when calling a method \u2014 Python inserts it automatically. But you must include it in the method definition. Forgetting 'self' is one of the most common OOP mistakes.",
          "Inside a method, use self.attribute to read or set the object's attributes. Without self, you would be creating a local variable that disappears when the method returns.",
        ],
        code: {
          lang: "python", label: "how self works",
          code:
`class Counter:
    def __init__(self, start=0):
        self.count = start       # instance attribute

    def increment(self):
        self.count += 1          # modifies THIS object's count

    def reset(self):
        self.count = 0

    def get(self):
        return self.count

# Two independent counters
c1 = Counter()
c2 = Counter(start=10)

c1.increment()
c1.increment()
c1.increment()
c2.increment()

print(c1.get())   # 3
print(c2.get())   # 11  \u2014 completely independent

c1.reset()
print(c1.get())   # 0
print(c2.get())   # 11  \u2014 c2 unaffected`,
          output:
`3
11
0
11`,
        },
        tip: "A helpful mental model: dog1.bark() is exactly equivalent to Dog.bark(dog1). Python automatically passes the object on the left of the dot as the first argument (self).",
      },
      {
        heading: "Class attributes vs instance attributes",
        body: [
          "Instance attributes (set with self.x = ...) belong to each individual object. Every object gets its own copy. Class attributes are defined directly in the class body (not inside any method) and are shared by ALL instances.",
          "Class attributes are useful for data that should be the same for every instance: a species name for all dogs, a tax rate for all orders, a version number for all instances of a tool.",
          "When you access an attribute, Python first looks at the instance. If not found, it looks at the class. This means an instance attribute can 'shadow' a class attribute with the same name.",
        ],
        code: {
          lang: "python", label: "class vs instance attributes",
          code:
`class Dog:
    # CLASS attribute \u2014 shared by all Dog instances
    species = "Canis familiaris"
    count   = 0

    def __init__(self, name, breed):
        # INSTANCE attributes \u2014 unique to each Dog
        self.name  = name
        self.breed = breed
        Dog.count += 1    # update the class-level counter

    def info(self):
        print(f"{self.name} ({self.breed}) \u2014 {self.species}")

d1 = Dog("Rex",   "Labrador")
d2 = Dog("Bella", "Poodle")
d3 = Dog("Max",   "Beagle")

d1.info()
d2.info()

# Class attributes accessible via class or instance
print(Dog.species)     # via class
print(d1.species)      # via instance (looks up to class)
print(f"Total dogs created: {Dog.count}")`,
          output:
`Rex (Labrador) \u2014 Canis familiaris
Bella (Poodle) \u2014 Canis familiaris
Canis familiaris
Canis familiaris
Total dogs created: 3`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What is the purpose of __init__ in a Python class?", options: ["It runs when the class is deleted", "It runs automatically when a new object is created", "It is the main method of the program", "It defines class attributes only"], answer: 1, explanation: "__init__ is the constructor. Python calls it automatically every time you create a new instance with ClassName()." },
      { type: "truefalse", q: "You must explicitly pass 'self' when calling a method on an object.", answer: false, explanation: "Python passes 'self' automatically. dog1.bark() works without you passing self \u2014 Python inserts dog1 as self behind the scenes." },
      { type: "predict", q: "What prints?", code: `class Cat:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(f"{self.name} says meow")\nc = Cat("Whiskers")\nc.speak()`, answer: "Whiskers says meow", explanation: "Cat('Whiskers') sets self.name='Whiskers'. speak() prints the name." },
      { type: "fillblank", q: "Class names in Python use ________ convention (e.g. MyClass).", answer: "CamelCase", hint: "Each word starts with a capital letter, no underscores" },
      { type: "mcq", q: "What is the difference between a class attribute and an instance attribute?", options: ["No difference", "Class attributes are shared by all instances; instance attributes are unique per object", "Instance attributes are faster", "Class attributes cannot be changed"], answer: 1, explanation: "Class attributes (defined in class body) are shared across all instances. Instance attributes (set via self.x) belong to each individual object." },
    ],
  },

  l27: {
    id: "l27", title: "Inheritance", duration: "13m",
    intro: "Inheritance lets you create a new class that automatically gets all the attributes and methods of an existing class. It models 'is-a' relationships: a Dog IS-A Animal. A SavingsAccount IS-A BankAccount. This avoids code duplication and creates logical hierarchies.",
    sections: [
      {
        heading: "Basic inheritance",
        body: [
          "To inherit from a class, put the parent class name in parentheses after your new class name. The new class (child/subclass) automatically gets everything from the parent (base/superclass).",
          "The child class can then add new methods and attributes, or override (replace) existing methods from the parent. This is the core mechanism of OOP reuse.",
          "super() is a special function that gives you access to the parent class. You almost always call super().__init__() inside the child's __init__ to run the parent's setup code before adding your own.",
        ],
        code: {
          lang: "python", label: "inheritance basics",
          code:
`# Parent class
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age  = age

    def eat(self):
        print(f"{self.name} is eating.")

    def sleep(self):
        print(f"{self.name} is sleeping.")

    def __str__(self):
        return f"{self.name} (age {self.age})"

# Child class \u2014 inherits Animal
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)   # run Animal's __init__
        self.breed = breed            # add Dog-specific attribute

    def bark(self):                   # new method
        print(f"{self.name} says: Woof!")

    def eat(self):                    # OVERRIDE parent method
        print(f"{self.name} wolfs down some kibble!")

class Cat(Animal):
    def purr(self):
        print(f"{self.name} purrs contentedly.")

# Dog gets Animal's methods + its own
rex = Dog("Rex", 3, "Labrador")
rex.eat()     # overridden version
rex.sleep()   # inherited from Animal
rex.bark()    # Dog-specific

# Cat gets Animal's methods + its own
whiskers = Cat("Whiskers", 5)
whiskers.sleep()  # inherited
whiskers.purr()   # Cat-specific
print(whiskers)   # uses Animal's __str__`,
          output:
`Rex wolfs down some kibble!
Rex is sleeping.
Rex says: Woof!
Whiskers is sleeping.
Whiskers purrs contentedly.
Whiskers (age 5)`,
        },
      },
      {
        heading: "isinstance() and the inheritance chain",
        body: [
          "isinstance() checks if an object is an instance of a class OR any of its parent classes. This is why isinstance() is more useful than type() for class hierarchies.",
          "Every class in Python ultimately inherits from 'object' \u2014 the base class of all classes. This gives every object methods like __str__, __repr__, and __eq__ that you can override.",
          "You can also check the class hierarchy with issubclass(). Both are useful for writing functions that accept multiple related types.",
        ],
        code: {
          lang: "python", label: "isinstance and hierarchy",
          code:
`class Animal:
    pass

class Dog(Animal):
    pass

class GoldenRetriever(Dog):
    pass

buddy = GoldenRetriever()

# isinstance checks the whole chain
print(isinstance(buddy, GoldenRetriever))  # True
print(isinstance(buddy, Dog))              # True \u2014 Dog IS parent
print(isinstance(buddy, Animal))           # True \u2014 Animal IS grandparent
print(isinstance(buddy, str))              # False

# issubclass checks class relationships
print(issubclass(GoldenRetriever, Dog))    # True
print(issubclass(Dog, Animal))             # True
print(issubclass(GoldenRetriever, Animal)) # True \u2014 transitively

# Every class inherits from object
print(isinstance(buddy, object))           # True
print(isinstance("hello", object))         # True \u2014 everything does!`,
          output:
`True
True
True
False
True
True
True
True
True`,
        },
      },
      {
        heading: "A realistic example: bank accounts",
        body: [
          "Inheritance shines with real-world hierarchies. A BankAccount has basic deposit and withdraw. A SavingsAccount IS-A BankAccount but also earns interest. A CheckingAccount IS-A BankAccount but has overdraft protection.",
          "Notice how the child classes reuse all of BankAccount's logic and only add or change what is specific to them. This is DRY (Don't Repeat Yourself) at the class level.",
        ],
        code: {
          lang: "python", label: "bank account hierarchy",
          code:
`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner   = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount
        print(f"Deposited {amount:.2f}. Balance: {self.balance:.2f}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
            return False
        self.balance -= amount
        print(f"Withdrew {amount:.2f}. Balance: {self.balance:.2f}")
        return True

    def __str__(self):
        return f"{self.owner}'s account: {self.balance:.2f}"

class SavingsAccount(BankAccount):
    def __init__(self, owner, balance=0, rate=0.05):
        super().__init__(owner, balance)
        self.rate = rate            # interest rate

    def apply_interest(self):
        interest = self.balance * self.rate
        self.balance += interest
        print(f"Interest applied: {interest:.2f}")

class CheckingAccount(BankAccount):
    def __init__(self, owner, balance=0, overdraft=100):
        super().__init__(owner, balance)
        self.overdraft = overdraft   # how much they can go negative

    def withdraw(self, amount):      # override: allow overdraft
        if amount > self.balance + self.overdraft:
            print("Exceeds overdraft limit!")
            return False
        self.balance -= amount
        print(f"Withdrew {amount:.2f}. Balance: {self.balance:.2f}")
        return True

savings  = SavingsAccount("Alice", 1000)
checking = CheckingAccount("Bob", 100)

savings.deposit(500)
savings.apply_interest()
print(savings)

checking.withdraw(150)   # goes into overdraft
print(checking)`,
          output:
`Deposited $500.00. Balance: $1500.00
Interest applied: $75.00
Alice's account: $1575.00
Withdrew $150.00. Balance: $-50.00
Bob's account: $-50.00`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "What does super().__init__() do inside a child class?", options: ["Creates a new parent object", "Calls the parent class's __init__ method", "Deletes the parent class", "Copies all parent methods"], answer: 1, explanation: "super().__init__() calls the parent's constructor, running its setup code. This is how you ensure the parent's attributes are properly initialized." },
      { type: "truefalse", q: "A child class can override methods from its parent class.", answer: true, explanation: "Overriding means defining a method in the child class with the same name as one in the parent. Python uses the child's version when called on a child instance." },
      { type: "predict", q: "What prints?", code: `class A:\n    def hello(self):\n        print("A")\nclass B(A):\n    def hello(self):\n        print("B")\nb = B()\nb.hello()`, answer: "B", explanation: "B overrides A's hello(). When called on a B instance, Python uses B's version." },
      { type: "fillblank", q: "isinstance(obj, ParentClass) returns True if obj is an instance of ParentClass or any of its ________ classes.", answer: "child", hint: "Classes that inherit FROM ParentClass" },
      { type: "mcq", q: "What is the 'is-a' relationship?", options: ["Two classes with no connection", "A child class inherits from a parent (Dog IS-A Animal)", "Two classes that use each other", "A class that contains another class"], answer: 1, explanation: "Inheritance models 'is-a' relationships. Dog IS-A Animal, so Dog can inherit from Animal. If the relationship is 'has-a', use composition (an attribute) instead." },
    ],
  },

  l28: {
    id: "l28", title: "Special Methods (Dunder Methods)", duration: "11m",
    intro: "Special methods (called dunder methods because they have double underscores on both sides, like __str__) let your classes integrate with Python's built-in syntax. Make your objects printable, comparable, addable, and more \u2014 using the same operators Python uses for built-in types.",
    sections: [
      {
        heading: "Why dunder methods exist",
        body: [
          "When you write print(my_object), Python calls my_object.__str__(). When you write len(my_object), Python calls my_object.__len__(). When you write obj1 + obj2, Python calls obj1.__add__(obj2). These special methods are the hooks that let your classes speak Python's language.",
          "Without dunder methods, print(my_object) would show something useless like '<__main__.Dog object at 0x10a2b3c4>'. With __str__, you control exactly what gets printed.",
          "You have already used dunder methods without knowing it: __init__ is the most important one. Now we explore the others that make objects feel natural to use.",
        ],
        code: {
          lang: "python", label: "the most important dunders",
          code:
`class Book:
    def __init__(self, title, author, pages):
        self.title  = title
        self.author = author
        self.pages  = pages

    # __str__: controls print() and str()
    def __str__(self):
        return f'"{self.title}" by {self.author}'

    # __repr__: controls repr() and how it shows in REPL
    # Should be unambiguous \u2014 ideally valid Python to recreate the object
    def __repr__(self):
        return f"Book({self.title!r}, {self.author!r}, {self.pages})"

    # __len__: controls len()
    def __len__(self):
        return self.pages

    # __eq__: controls == comparison
    def __eq__(self, other):
        if not isinstance(other, Book):
            return NotImplemented
        return self.title == other.title and self.author == other.author

    # __lt__: controls < comparison (also enables sorting!)
    def __lt__(self, other):
        return self.pages < other.pages

b1 = Book("Python Crash Course", "Eric Matthes", 544)
b2 = Book("Clean Code", "Robert Martin", 431)
b3 = Book("Python Crash Course", "Eric Matthes", 544)

print(b1)               # uses __str__
print(repr(b1))         # uses __repr__
print(len(b1))          # uses __len__
print(b1 == b3)         # True  \u2014 uses __eq__
print(b1 == b2)         # False
print(b2 < b1)          # True  \u2014 uses __lt__

# Because we defined __lt__, we can sort a list of books!
library = [b1, b2, Book("The Pragmatic Programmer", "Hunt", 352)]
sorted_books = sorted(library)
for book in sorted_books:
    print(f"  {len(book)} pages: {book}")`,
          output:
`"Python Crash Course" by Eric Matthes
Book('Python Crash Course', 'Eric Matthes', 544)
544
True
False
True
  352 pages: "The Pragmatic Programmer" by Hunt
  431 pages: "Clean Code" by Robert Martin
  544 pages: "Python Crash Course" by Eric Matthes`,
        },
      },
      {
        heading: "Arithmetic dunders \u2014 making objects support operators",
        body: [
          "You can make your objects support +, -, *, /, and other operators by implementing the corresponding dunder methods. This makes custom types feel as natural as built-in types.",
          "A great example is a 2D Vector class. Vectors support addition (v1 + v2), scalar multiplication (v * 3), and negation (-v). Without dunder methods you would write vector_add(v1, v2). With them, you write v1 + v2 \u2014 cleaner and more readable.",
        ],
        code: {
          lang: "python", label: "arithmetic dunders",
          code:
`import math

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):          # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):          # v1 - v2
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):         # v * 3
        return Vector(self.x * scalar, self.y * scalar)

    def __rmul__(self, scalar):        # 3 * v  (reversed)
        return self.__mul__(scalar)

    def __neg__(self):                 # -v
        return Vector(-self.x, -self.y)

    def __abs__(self):                 # abs(v) = magnitude
        return math.sqrt(self.x**2 + self.y**2)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

v1 = Vector(2, 3)
v2 = Vector(1, -1)

print(v1 + v2)       # Vector(3, 2)
print(v1 - v2)       # Vector(1, 4)
print(v1 * 3)        # Vector(6, 9)
print(3 * v1)        # Vector(6, 9)
print(-v1)           # Vector(-2, -3)
print(f"|v1| = {abs(v1):.3f}")  # magnitude`,
          output:
`Vector(3, 2)
Vector(1, 4)
Vector(6, 9)
Vector(6, 9)
Vector(-2, -3)
|v1| = 3.606`,
        },
        tip: "When you define __lt__ (less than), you can also get >, <=, >= for free by using @functools.total_ordering decorator \u2014 you only need to define __eq__ and one comparison method.",
      },
    ],
    quiz: [
      { type: "mcq", q: "Which dunder method controls what print(obj) displays?", options: ["__repr__", "__print__", "__str__", "__display__"], answer: 2, explanation: "__str__ controls the 'friendly' string representation shown by print() and str(). __repr__ is the 'official' representation used in the REPL and repr()." },
      { type: "truefalse", q: "__len__ lets you use len() on your custom objects.", answer: true, explanation: "Python calls obj.__len__() when you write len(obj). Define this method to make your class work with len()." },
      { type: "predict", q: "What prints?", code: `class Box:\n    def __init__(self, v):\n        self.v = v\n    def __add__(self, other):\n        return Box(self.v + other.v)\n    def __str__(self):\n        return f"Box({self.v})"\nb = Box(3) + Box(4)\nprint(b)`, answer: "Box(7)", explanation: "Box(3) + Box(4) calls __add__, creating Box(3+4) = Box(7). print uses __str__." },
      { type: "fillblank", q: "To make obj1 + obj2 work for your class, implement the ________ dunder method.", answer: "__add__", hint: "Double underscore, 'add', double underscore" },
      { type: "mcq", q: "What does __repr__ return that __str__ does not need to?", options: ["A shorter string", "An unambiguous representation, ideally valid Python to recreate the object", "HTML markup", "The object's memory address"], answer: 1, explanation: "__repr__ should return an unambiguous string \u2014 ideally valid Python code that could recreate the object. __str__ is for human-friendly display." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // MODULE 7 \u2014 FILE I/O AND ERROR HANDLING
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l29: {
    id: "l29", title: "Reading and Writing Files", duration: "12m",
    intro: "Real programs need to store data between runs. Files are the most fundamental form of persistence. Python makes file operations straightforward with built-in open() and the with statement that automatically handles closing.",
    sections: [
      {
        heading: "Opening files \u2014 the with statement",
        body: [
          "The open() function returns a file object. You can work with it directly, but then you must remember to call file.close() afterwards, even if an error occurs. This is error-prone.",
          "The 'with' statement (a context manager) handles this automatically. When the with block ends \u2014 whether normally or due to an exception \u2014 Python automatically closes the file. Always use 'with' for file operations.",
          "The mode argument controls how the file is opened: 'r' for read (default), 'w' for write (overwrites), 'a' for append (adds to end), 'x' for exclusive creation (fails if file exists). Add 'b' for binary mode (e.g. 'rb', 'wb').",
        ],
        code: {
          lang: "python", label: "writing and reading files",
          code:
`# Writing a file (creates it if it does not exist, overwrites if it does)
with open("notes.txt", "w") as file:
    file.write("First line\\n")
    file.write("Second line\\n")
    file.write("Third line\\n")

print("File written.")

# Reading entire file at once
with open("notes.txt", "r") as file:
    content = file.read()
print(content)

# Reading line by line \u2014 memory efficient for large files
with open("notes.txt", "r") as file:
    for line in file:
        print(f"Line: {line.rstrip()}")   # rstrip removes trailing newline

# Reading all lines into a list
with open("notes.txt", "r") as file:
    lines = file.readlines()
print(f"Number of lines: {len(lines)}")
print(f"First line: {lines[0].rstrip()}")`,
          output:
`File written.
First line
Second line
Third line

Line: First line
Line: Second line
Line: Third line
Number of lines: 3
First line: First line`,
        },
      },
      {
        heading: "Appending, file paths, and checking existence",
        body: [
          "Mode 'w' always overwrites the entire file. Mode 'a' (append) adds to the end without touching existing content. Use append when you want to add log entries, collect data over time, or build a file incrementally.",
          "File paths: a plain filename like 'notes.txt' creates/reads the file in the current working directory (wherever you ran Python from). For other locations, use a full path. Python's pathlib module makes path handling cross-platform and much cleaner than string manipulation.",
          "Always check if a file exists before trying to read it \u2014 otherwise you get a FileNotFoundError. The pathlib Path object has an exists() method for this.",
        ],
        code: {
          lang: "python", label: "append and pathlib",
          code:
`from pathlib import Path

# Create a path object \u2014 works on Windows, Mac, Linux
notes_path = Path("notes.txt")

# Check existence before reading
if notes_path.exists():
    print(f"File size: {notes_path.stat().st_size} bytes")
else:
    print("File does not exist yet")

# Append to a file (does not overwrite)
with open("log.txt", "a") as log:
    log.write("Session started\\n")
    log.write("User logged in\\n")

with open("log.txt", "a") as log:
    log.write("User logged out\\n")

# Read back all logs
with open("log.txt", "r") as log:
    print(log.read())

# pathlib for structured paths
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)             # create folder if not exists
output   = data_dir / "results.txt"       # / operator joins paths!
output.write_text("Result: 42\\n")         # shorthand for open+write+close
print(output.read_text())`,
          output:
`File size: 33 bytes
Session started
User logged in
User logged out

Result: 42`,
        },
        tip: "pathlib.Path is the modern Python way to work with file paths. The / operator joins path components: Path('data') / 'results.txt' gives you Path('data/results.txt'). It works on all operating systems.",
      },
      {
        heading: "Working with JSON files",
        body: [
          "JSON (JavaScript Object Notation) is the most common format for storing structured data as text. Python's built-in json module converts between Python objects (dicts, lists, strings, numbers, booleans, None) and JSON text.",
          "json.dump() writes Python data to a JSON file. json.load() reads a JSON file back into Python. json.dumps() converts to a JSON string. json.loads() parses a JSON string. The 's' suffix means 'string' \u2014 no file involved.",
          "JSON is ideal for configuration files, saving program state, and communicating with web APIs. Nearly every web API returns JSON.",
        ],
        code: {
          lang: "python", label: "JSON read and write",
          code:
`import json

# Python data to save
students = [
    {"name": "Alice", "grade": 95, "passed": True},
    {"name": "Bob",   "grade": 72, "passed": True},
    {"name": "Carol", "grade": 45, "passed": False},
]

# Write to JSON file
with open("students.json", "w") as f:
    json.dump(students, f, indent=2)   # indent=2 for pretty formatting

print("Saved to students.json")

# Read back from JSON file
with open("students.json", "r") as f:
    loaded = json.load(f)

print(type(loaded))           # <class 'list'>
print(type(loaded[0]))        # <class 'dict'>
print(loaded[0]["name"])      # Alice

# Filter: only passing students
passing = [s for s in loaded if s["passed"]]
print(f"Passing: {[s['name'] for s in passing]}")

# JSON string conversion (no file)
data   = {"key": "value", "number": 42}
s      = json.dumps(data)
print(type(s), s)
parsed = json.loads(s)
print(type(parsed), parsed["key"])`,
          output:
`Saved to students.json
<class 'list'>
<class 'dict'>
Alice
Passing: ['Alice', 'Bob']
<class 'str'> {"key": "value", "number": 42}
<class 'dict'> value`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "Why should you use 'with open()' instead of open() + close()?", options: ["with is faster", "with automatically closes the file even if an error occurs", "close() does not always work", "with can open multiple files"], answer: 1, explanation: "The 'with' context manager guarantees the file is closed when the block ends, even if an exception is raised. Without it, you risk leaving files open if an error occurs." },
      { type: "truefalse", q: "Opening a file with mode 'w' will delete existing content and start fresh.", answer: true, explanation: "Mode 'w' (write) truncates the file to zero length first. To add to an existing file without deleting its contents, use mode 'a' (append)." },
      { type: "fillblank", q: "json.________(data, f, indent=2) writes Python data to a JSON file.", answer: "dump", hint: "It 'dumps' data into a file" },
      { type: "predict", q: "What type does json.load() return when the JSON file contains a JSON array?", code: `# students.json contains: [{"name":"Alice"},{"name":"Bob"}]\nimport json\nwith open("students.json") as f:\n    data = json.load(f)\nprint(type(data))`, answer: "<class 'list'>", explanation: "A JSON array maps to a Python list. json.load() converts JSON types to their Python equivalents: array->list, object->dict, string->str, number->int/float." },
      { type: "mcq", q: "Which pathlib feature creates a file path that works on both Windows and Mac?", options: ["os.path.join()", "Path('folder') / 'file.txt'", "str concatenation with '/'", "Both A and B"], answer: 3, explanation: "Both os.path.join() and pathlib's / operator create cross-platform paths. Pathlib is the modern preferred approach." },
    ],
  },

  l30: {
    id: "l30", title: "Error Handling with try/except", duration: "12m",
    intro: "Programs encounter unexpected situations: files that do not exist, users who type letters when you ask for numbers, network connections that time out. Error handling lets your program deal with these gracefully instead of crashing.",
    sections: [
      {
        heading: "Exceptions \u2014 Python's error system",
        body: [
          "When Python encounters an error it cannot handle, it 'raises an exception' \u2014 an object that describes what went wrong. If you do not catch the exception, Python prints a traceback and stops the program.",
          "Python has a hierarchy of built-in exception types. The most common ones you will encounter: ValueError (wrong value type), TypeError (wrong type altogether), FileNotFoundError (file does not exist), KeyError (dict key missing), IndexError (list index out of range), ZeroDivisionError (divided by zero), AttributeError (object has no such attribute).",
          "The try/except block is Python's way of catching exceptions and responding to them instead of crashing. Code in the try block is attempted. If an exception occurs, execution jumps to the matching except block.",
        ],
        code: {
          lang: "python", label: "basic try/except",
          code:
`# Without try/except \u2014 crashes on bad input
# age = int(input("Age: "))   # crashes if user types "hello"

# With try/except \u2014 handles it gracefully
try:
    age = int(input("Enter your age: "))
    print(f"Next year you will be {age + 1}")
except ValueError:
    print("That is not a valid number. Please enter digits only.")

print("Program continues after the try/except block.")

# Multiple except blocks \u2014 catch different errors differently
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Both arguments must be numbers!")
        return None

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # Error message + None
print(safe_divide(10, "x"))  # Error message + None`,
          output:
`Enter your age: hello
That is not a valid number. Please enter digits only.
Program continues after the try/except block.
5.0
Error: Cannot divide by zero!
None
Error: Both arguments must be numbers!
None`,
        },
      },
      {
        heading: "else, finally, and re-raising exceptions",
        body: [
          "try/except has two optional extra clauses: 'else' runs if NO exception occurred (not to be confused with if/else). 'finally' ALWAYS runs regardless of whether an exception occurred or not \u2014 perfect for cleanup like closing resources.",
          "You can re-raise an exception after catching it using 'raise' with no argument. This is useful when you want to log or do something with an error but still let it propagate up to the caller.",
          "You can also access the exception object itself using 'as e'. This gives you the error message and other details about what went wrong.",
        ],
        code: {
          lang: "python", label: "else, finally, and exception objects",
          code:
`def read_number_from_file(filename):
    try:
        with open(filename) as f:
            text = f.read().strip()
        number = int(text)
    except FileNotFoundError:
        print(f"File '{filename}' not found.")
        return None
    except ValueError as e:
        # 'e' is the exception object with details
        print(f"File content is not a number: {e}")
        return None
    else:
        # Only runs if NO exception occurred
        print(f"Successfully read number: {number}")
        return number
    finally:
        # ALWAYS runs \u2014 even if there was an exception
        print("Finished attempting to read file.")

# Test with a valid file
result = read_number_from_file("number.txt")  # assume it has "42"

print("---")

# Catching multiple exceptions with a tuple
try:
    data = {}
    x    = data["missing_key"]   # KeyError
except (KeyError, IndexError) as e:
    print(f"Missing data: {type(e).__name__}: {e}")

# raise \u2014 re-raise after logging
def process(value):
    try:
        return 100 / value
    except ZeroDivisionError as e:
        print(f"[LOG] ZeroDivisionError in process(): {e}")
        raise   # re-raise the same exception`,
          output:
`Finished attempting to read file.
File 'number.txt' not found.
---
Missing data: KeyError: 'missing_key'`,
        },
        tip: "A good rule: catch the most specific exception possible. Never use bare 'except:' or 'except Exception:' to swallow all errors \u2014 you will accidentally hide bugs. Catch exactly what you expect and let unexpected errors propagate.",
      },
      {
        heading: "Raising your own exceptions",
        body: [
          "You can raise exceptions yourself using the 'raise' keyword. This lets you enforce rules in your functions and communicate errors to callers in a standardised way.",
          "You can raise any built-in exception type with a custom message, or create your own exception classes by inheriting from Exception. Custom exceptions make your code's error types explicit and self-documenting.",
        ],
        code: {
          lang: "python", label: "raising exceptions",
          code:
`# Raising built-in exceptions to enforce rules
def set_age(age):
    if not isinstance(age, int):
        raise TypeError(f"age must be int, got {type(age).__name__}")
    if age < 0 or age > 150:
        raise ValueError(f"age must be 0-150, got {age}")
    return age

try:
    set_age("twenty")
except TypeError as e:
    print(f"TypeError: {e}")

try:
    set_age(200)
except ValueError as e:
    print(f"ValueError: {e}")

# Custom exception classes
class InsufficientFundsError(Exception):
    def __init__(self, amount, balance):
        self.amount  = amount
        self.balance = balance
        super().__init__(
            f"Cannot withdraw {amount:.2f}: balance is {balance:.2f}"
        )

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount

try:
    withdraw(50.00, 100.00)
except InsufficientFundsError as e:
    print(f"Bank error: {e}")
    print(f"  Tried to withdraw: {e.amount}")
    print(f"  Available balance: {e.balance}")`,
          output:
`TypeError: age must be int, got str
ValueError: age must be 0-150, got 200
Bank error: Cannot withdraw $100.00: balance is $50.00
  Tried to withdraw: $100.0
  Available balance: $50.0`,
        },
      },
    ],
    quiz: [
      { type: "mcq", q: "Which clause in try/except ALWAYS runs, even if an exception occurs?", options: ["else", "except", "finally", "always"], answer: 2, explanation: "'finally' runs unconditionally \u2014 after the try block, after any except block, whether or not an exception occurred. Use it for cleanup code." },
      { type: "truefalse", q: "You should use bare 'except:' to catch all possible exceptions.", answer: false, explanation: "Bare 'except:' catches EVERYTHING including KeyboardInterrupt and system errors. Always specify the exception type(s) you expect. Catch only what you can handle." },
      { type: "predict", q: "What prints?", code: `try:\n    x = int("abc")\nexcept ValueError:\n    print("caught")\nelse:\n    print("no error")\nfinally:\n    print("done")`, answer: "caught\ndone", explanation: "int('abc') raises ValueError. 'caught' prints. 'else' is skipped (exception occurred). 'finally' always runs: 'done' prints." },
      { type: "fillblank", q: "To create a custom exception class, inherit from the built-in ________ class.", answer: "Exception", hint: "The base class for all non-system-exiting exceptions" },
      { type: "mcq", q: "What does 'raise' with no argument do inside an except block?", options: ["Raises a new generic Exception", "Re-raises the current exception", "Clears the exception", "Raises StopIteration"], answer: 1, explanation: "Bare 'raise' inside an except block re-raises the same exception that was caught. Useful for logging an error and then letting it propagate." },
    ],
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // MODULE 8 \u2014 MODULES AND PACKAGES
  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  l31: {
    id: "l31", title: "Modules, Packages, and pip", duration: "11m",
    intro: "No one writes all their code from scratch. Python's module system lets you split your code into reusable files, import the standard library's 200+ built-in modules, and install thousands of third-party packages with a single command.",
    sections: [
      {
        heading: "What is a module?",
        body: [
          "A module is simply a .py file. When you write 'import math', Python finds math.py in its standard library, runs it, and makes everything in it available under the name 'math'. You can import your own files the same way.",
          "There are three kinds of modules: the standard library (comes with Python \u2014 math, os, sys, datetime, json, random, etc.), third-party packages (installed via pip \u2014 requests, numpy, pandas, flask, etc.), and your own .py files.",
          "Import statements should go at the top of your file. Python caches modules after the first import \u2014 importing the same module twice does not run it twice.",
        ],
        code: {
          lang: "python", label: "importing modules",
          code:
`# Import the whole module \u2014 access with module.name
import math
import random
import datetime

print(math.pi)
print(math.sqrt(144))
print(random.randint(1, 10))
print(datetime.date.today())

# Import specific names \u2014 use directly without prefix
from math import pi, sqrt, ceil
print(pi)
print(sqrt(25))
print(ceil(4.2))

# Import with alias \u2014 shorter name
import datetime as dt
import random as rnd
print(dt.date.today())
print(rnd.choice(["apple", "banana", "cherry"]))

# Import everything (avoid in production \u2014 pollutes namespace)
# from math import *`,
          output:
`3.141592653589793
12.0
7
2024-01-15
3.141592653589793
5.0
5
2024-01-15
banana`,
        },
      },
      {
        heading: "Creating your own modules",
        body: [
          "Any .py file is a module. To use one file's code in another, just import it by filename (without the .py extension). Both files must be in the same directory (or on Python's path).",
          "The if __name__ == '__main__': pattern is important: it lets a file work both as a standalone script (when you run it directly) and as an importable module (when another file imports it). Code inside this block only runs when the file is executed directly.",
        ],
        code: {
          lang: "python", label: "creating and using your own module",
          code:
`# File: calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# This only runs when calculator.py is run directly
# NOT when it is imported by another file
if __name__ == "__main__":
    print("Testing calculator:")
    print(add(2, 3))         # 5
    print(divide(10, 4))     # 2.5

# ---------------------------------
# File: main.py (imports calculator)
import calculator

result = calculator.add(10, 5)
print(result)    # 15

# Or import specific functions
from calculator import divide, multiply
print(divide(20, 4))    # 5.0
print(multiply(3, 7))   # 21`,
          output:
`15
5.0
21`,
        },
        tip: "The __name__ variable is set to '__main__' when the file is run directly. When imported, __name__ is set to the module's filename (e.g. 'calculator'). This is how Python knows whether to run the test code.",
      },
      {
        heading: "pip \u2014 installing third-party packages",
        body: [
          "pip is Python's package manager. It downloads and installs packages from PyPI (the Python Package Index), which hosts over 500,000 packages. You install a package once and then import it in any project.",
          "Always use a virtual environment (venv) for each project. A virtual environment is an isolated Python installation \u2014 packages installed in it do not affect other projects. This prevents version conflicts between projects.",
          "Key pip commands you will use constantly: pip install, pip uninstall, pip list, pip freeze > requirements.txt (save all installed packages), pip install -r requirements.txt (install from saved list).",
        ],
        code: {
          lang: "bash", label: "pip and virtual environments",
          code:
`# Create a virtual environment
python -m venv venv

# Activate it:
# Windows:
venv\\Scripts\\activate
# Mac/Linux:
source venv/bin/activate

# Your prompt now shows (venv) \u2014 you are in the virtual environment

# Install packages
pip install requests        # HTTP library
pip install numpy           # numerical computing
pip install pandas          # data analysis
pip install flask           # web framework

# List installed packages
pip list

# Save dependencies to a file (for sharing your project)
pip freeze > requirements.txt

# Another developer can recreate your environment:
pip install -r requirements.txt

# Deactivate when done
deactivate`,
          output:
`(venv) $ pip install requests
Successfully installed requests-2.31.0

(venv) $ pip list
Package    Version
---------- -------
requests   2.31.0`,
        },
        warning: "Always activate your virtual environment before installing packages. If you forget to activate it, pip installs globally, which can cause version conflicts across projects.",
      },
    ],
    quiz: [
      { type: "mcq", q: "What does 'from math import sqrt' do differently from 'import math'?", options: ["It is faster", "It imports only sqrt, letting you use sqrt() without the math. prefix", "It imports everything in math", "It creates a copy of the math module"], answer: 1, explanation: "'from math import sqrt' imports only the sqrt function. You then call sqrt() directly. With 'import math', you must call math.sqrt()." },
      { type: "truefalse", q: "Code inside 'if __name__ == \"__main__\":' runs both when the file is run directly AND when it is imported.", answer: false, explanation: "That block ONLY runs when the file is executed directly. When imported, __name__ equals the module name (not '__main__'), so the block is skipped." },
      { type: "fillblank", q: "The command to install a package called 'requests' is: pip ________ requests", answer: "install", hint: "The pip sub-command for adding packages" },
      { type: "mcq", q: "What is a virtual environment used for?", options: ["Running Python faster", "Isolating project dependencies to avoid conflicts between projects", "Connecting to the internet", "Debugging code"], answer: 1, explanation: "A virtual environment creates an isolated Python installation per project. Different projects can use different versions of the same package without conflicts." },
      { type: "predict", q: "If you have a file mymodule.py and run: python mymodule.py \u2014 what is the value of __name__ inside it?", code: `# Inside mymodule.py:\nprint(__name__)`, answer: "__main__", explanation: "When a file is run directly, Python sets __name__ to '__main__'. When imported by another file, __name__ is set to the module's filename ('mymodule')." },
    ],
  },

};

export function getLessonContent4(id: string): LessonContent | undefined {
  return lessons[id];
}