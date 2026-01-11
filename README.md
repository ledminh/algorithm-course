# Algorithm Course - Interactive Demonstrations

An interactive website demonstrating popular algorithms commonly asked in technical interviews. This project provides visual, step-by-step explanations of sorting and searching algorithms with animated demonstrations.

## 🎯 Features

- **Interactive Visualizations**: Watch algorithms execute step-by-step with animated visualizations
- **Detailed Explanations**: Each algorithm includes:
  - What it is and how it works
  - When and why to use it
  - Step-by-step breakdowns
  - Time and space complexity
  - Code examples in JavaScript
- **Multiple Algorithms**:
  - **Bubble Sort**: Simple comparison-based sorting
  - **Quick Sort**: Efficient divide-and-conquer sorting
  - **Merge Sort**: Stable divide-and-conquer sorting
  - **Binary Search**: Efficient searching in sorted arrays

## 🚀 Getting Started

### View the Website

Simply open `index.html` in your web browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or double-click the `index.html` file in your file explorer.

### Using a Local Server (Optional)

For a better experience, you can serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then open your browser to `http://localhost:8000`

## 📚 Algorithms Included

### 1. Bubble Sort
- **Time Complexity**: O(n²) average and worst case, O(n) best case
- **Space Complexity**: O(1)
- **Best For**: Educational purposes, small datasets, nearly sorted data
- **Visualization**: Shows comparisons and swaps in real-time

### 2. Quick Sort
- **Time Complexity**: O(n log n) average case, O(n²) worst case
- **Space Complexity**: O(log n)
- **Best For**: General-purpose sorting, large datasets
- **Visualization**: Highlights pivot selection and partitioning

### 3. Merge Sort
- **Time Complexity**: O(n log n) all cases
- **Space Complexity**: O(n)
- **Best For**: Stable sorting, linked lists, external sorting
- **Visualization**: Shows divide and merge operations

### 4. Binary Search
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Best For**: Searching in sorted arrays
- **Visualization**: Shows search range narrowing with each step

## 🎮 How to Use

1. **Select an Algorithm**: Click on one of the algorithm buttons in the navigation bar
2. **Adjust Settings**: 
   - Use the speed slider to control animation speed
   - For Binary Search, enter a target value to search for
3. **Run the Visualization**:
   - Click "Start" to begin the animation
   - Click "Reset" to generate a new random array
   - Click "Step" for step-by-step execution
4. **Learn**: Read the descriptions, watch the visualization, and review the code examples

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Color-Coded Visualizations**:
  - Purple gradient: Normal state
  - Pink gradient: Elements being compared
  - Yellow-orange gradient: Elements being swapped
  - Blue gradient: Sorted elements
  - Orange gradient: Pivot elements (Quick Sort)
  - Green gradient: Found element (Binary Search)
- **Real-time Step Information**: See what the algorithm is doing at each step
- **Adjustable Speed**: Control how fast the animations run

## 🛠️ Technology Stack

- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: Algorithm implementations and DOM manipulation
- **No dependencies**: Pure vanilla JavaScript, no frameworks required

## 📖 Learning Objectives

This interactive course helps you:
- Understand how popular algorithms work internally
- Visualize the step-by-step execution of algorithms
- Compare time and space complexity
- Learn when to use each algorithm
- Prepare for technical interviews

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more algorithms
- Improve visualizations
- Enhance explanations
- Fix bugs or issues

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Interview Preparation Tips

- **Understand the Complexity**: Know the time and space complexity of each algorithm
- **Practice Implementation**: Try implementing each algorithm from scratch
- **Know the Trade-offs**: Understand when to use each algorithm
- **Explain Your Thinking**: Practice explaining how each algorithm works
- **Consider Edge Cases**: Think about empty arrays, single elements, duplicates, etc.

## 🌟 Future Enhancements

Potential additions to this course:
- More algorithms (Heap Sort, Radix Sort, etc.)
- Graph algorithms (BFS, DFS, Dijkstra's)
- Dynamic programming examples
- Tree traversal algorithms
- Step-by-step code execution highlighting
- Quiz mode to test understanding
- Performance comparison charts

---

**Happy Learning! 🚀**