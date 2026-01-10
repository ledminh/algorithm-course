// Main application state
const app = {
    currentAlgorithm: 'bubble-sort',
    isRunning: false,
    isPaused: false,
    animations: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBubbleSort();
    initQuickSort();
    initMergeSort();
    initBinarySearch();
});

// Navigation
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const algorithm = btn.dataset.algorithm;
            switchAlgorithm(algorithm);
        });
    });
}

function switchAlgorithm(algorithm) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.algorithm === algorithm) {
            btn.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.algorithm-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(algorithm).classList.add('active');

    app.currentAlgorithm = algorithm;
}

// Utility function to create bars
function createBars(container, array, maxHeight = 250) {
    container.innerHTML = '';
    const max = Math.max(...array);
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / max) * maxHeight}px`;
        bar.textContent = value;
        bar.dataset.index = index;
        container.appendChild(bar);
    });
}

// Utility function to delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate random array
function generateRandomArray(size = 12, min = 5, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Generate sorted array for binary search
function generateSortedArray(size = 15, min = 1, max = 100) {
    const arr = [];
    let current = min;
    for (let i = 0; i < size; i++) {
        current += Math.floor(Math.random() * 8) + 1;
        arr.push(Math.min(current, max));
    }
    return arr;
}

// ==================== BUBBLE SORT ====================
let bubbleArray = [];
let bubbleAnimating = false;

function initBubbleSort() {
    bubbleArray = generateRandomArray();
    const container = document.getElementById('bubble-visualization');
    createBars(container, bubbleArray);

    document.getElementById('bubble-start').addEventListener('click', startBubbleSort);
    document.getElementById('bubble-reset').addEventListener('click', resetBubbleSort);
    document.getElementById('bubble-step').addEventListener('click', stepBubbleSort);
}

function resetBubbleSort() {
    bubbleAnimating = false;
    bubbleArray = generateRandomArray();
    const container = document.getElementById('bubble-visualization');
    createBars(container, bubbleArray);
    document.getElementById('bubble-info').innerHTML = '<p>Click "Start" to begin the visualization</p>';
    document.getElementById('bubble-start').disabled = false;
}

async function startBubbleSort() {
    if (bubbleAnimating) return;
    
    bubbleAnimating = true;
    document.getElementById('bubble-start').disabled = true;
    const container = document.getElementById('bubble-visualization');
    const info = document.getElementById('bubble-info');
    const speed = 101 - document.getElementById('bubble-speed').value;
    
    const arr = [...bubbleArray];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        info.innerHTML = `<p><strong>Pass ${i + 1}:</strong> Finding the ${i + 1}${getOrdinalSuffix(i + 1)} largest element</p>`;
        
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (!bubbleAnimating) return;
            
            // Highlight comparing elements
            const bars = container.querySelectorAll('.bar');
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');
            
            info.innerHTML = `<p><strong>Pass ${i + 1}:</strong> Comparing ${arr[j]} and ${arr[j + 1]}</p>`;
            await delay(speed * 10);
            
            if (arr[j] > arr[j + 1]) {
                // Swap
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');
                bars[j].classList.add('swapping');
                bars[j + 1].classList.add('swapping');
                
                info.innerHTML = `<p><strong>Pass ${i + 1}:</strong> Swapping ${arr[j]} and ${arr[j + 1]} (${arr[j]} > ${arr[j + 1]})</p>`;
                
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
                
                await delay(speed * 10);
                createBars(container, arr);
                await delay(speed * 5);
            } else {
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');
            }
        }
        
        // Mark last element as sorted
        const bars = container.querySelectorAll('.bar');
        bars[n - i - 1].classList.add('sorted');
        
        if (!swapped) {
            info.innerHTML = `<p><strong>Pass ${i + 1}:</strong> No swaps made - array is sorted!</p>`;
            break;
        }
    }
    
    // Mark all as sorted
    const bars = container.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.add('sorted'));
    info.innerHTML = '<p><strong>Complete!</strong> Array is now sorted.</p>';
    
    bubbleAnimating = false;
    document.getElementById('bubble-start').disabled = false;
}

async function stepBubbleSort() {
    // Simple step implementation - just runs one comparison
    if (bubbleAnimating) return;
    alert('Step mode: Click "Start" and watch the algorithm progress step by step!');
}

// ==================== QUICK SORT ====================
let quickArray = [];
let quickAnimating = false;

function initQuickSort() {
    quickArray = generateRandomArray();
    const container = document.getElementById('quick-visualization');
    createBars(container, quickArray);

    document.getElementById('quick-start').addEventListener('click', startQuickSort);
    document.getElementById('quick-reset').addEventListener('click', resetQuickSort);
}

function resetQuickSort() {
    quickAnimating = false;
    quickArray = generateRandomArray();
    const container = document.getElementById('quick-visualization');
    createBars(container, quickArray);
    document.getElementById('quick-info').innerHTML = '<p>Click "Start" to begin the visualization</p>';
    document.getElementById('quick-start').disabled = false;
}

async function startQuickSort() {
    if (quickAnimating) return;
    
    quickAnimating = true;
    document.getElementById('quick-start').disabled = true;
    const container = document.getElementById('quick-visualization');
    const info = document.getElementById('quick-info');
    const speed = 101 - document.getElementById('quick-speed').value;
    
    const arr = [...quickArray];
    await quickSortHelper(arr, 0, arr.length - 1, container, info, speed);
    
    // Mark all as sorted
    const bars = container.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.add('sorted'));
    info.innerHTML = '<p><strong>Complete!</strong> Array is now sorted using Quick Sort.</p>';
    
    quickAnimating = false;
    document.getElementById('quick-start').disabled = false;
}

async function quickSortHelper(arr, low, high, container, info, speed) {
    if (low < high && quickAnimating) {
        const pivotIndex = await partition(arr, low, high, container, info, speed);
        await quickSortHelper(arr, low, pivotIndex - 1, container, info, speed);
        await quickSortHelper(arr, pivotIndex + 1, high, container, info, speed);
    }
}

async function partition(arr, low, high, container, info, speed) {
    const pivot = arr[high];
    info.innerHTML = `<p><strong>Partitioning:</strong> Pivot = ${pivot} (index ${high})</p>`;
    
    createBars(container, arr);
    const bars = container.querySelectorAll('.bar');
    bars[high].classList.add('pivot');
    await delay(speed * 15);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (!quickAnimating) return i + 1;
        
        bars[j].classList.add('comparing');
        info.innerHTML = `<p><strong>Partitioning:</strong> Comparing ${arr[j]} with pivot ${pivot}</p>`;
        await delay(speed * 10);
        
        if (arr[j] < pivot) {
            i++;
            bars[j].classList.remove('comparing');
            
            if (i !== j) {
                bars[i].classList.add('swapping');
                bars[j].classList.add('swapping');
                info.innerHTML = `<p><strong>Partitioning:</strong> Swapping ${arr[i]} and ${arr[j]}</p>`;
                
                [arr[i], arr[j]] = [arr[j], arr[i]];
                await delay(speed * 10);
                createBars(container, arr);
                bars[high].classList.add('pivot');
            }
        } else {
            bars[j].classList.remove('comparing');
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    info.innerHTML = `<p><strong>Partitioning:</strong> Placing pivot ${pivot} at position ${i + 1}</p>`;
    await delay(speed * 10);
    createBars(container, arr);
    await delay(speed * 10);
    
    return i + 1;
}

// ==================== MERGE SORT ====================
let mergeArray = [];
let mergeAnimating = false;

function initMergeSort() {
    mergeArray = generateRandomArray();
    const container = document.getElementById('merge-visualization');
    createBars(container, mergeArray);

    document.getElementById('merge-start').addEventListener('click', startMergeSort);
    document.getElementById('merge-reset').addEventListener('click', resetMergeSort);
}

function resetMergeSort() {
    mergeAnimating = false;
    mergeArray = generateRandomArray();
    const container = document.getElementById('merge-visualization');
    createBars(container, mergeArray);
    document.getElementById('merge-info').innerHTML = '<p>Click "Start" to begin the visualization</p>';
    document.getElementById('merge-start').disabled = false;
}

async function startMergeSort() {
    if (mergeAnimating) return;
    
    mergeAnimating = true;
    document.getElementById('merge-start').disabled = true;
    const container = document.getElementById('merge-visualization');
    const info = document.getElementById('merge-info');
    const speed = 101 - document.getElementById('merge-speed').value;
    
    const arr = [...mergeArray];
    await mergeSortHelper(arr, 0, arr.length - 1, container, info, speed);
    
    // Mark all as sorted
    createBars(container, arr);
    const bars = container.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.add('sorted'));
    info.innerHTML = '<p><strong>Complete!</strong> Array is now sorted using Merge Sort.</p>';
    
    mergeAnimating = false;
    document.getElementById('merge-start').disabled = false;
}

async function mergeSortHelper(arr, left, right, container, info, speed) {
    if (left >= right || !mergeAnimating) return;
    
    const mid = Math.floor((left + right) / 2);
    
    info.innerHTML = `<p><strong>Dividing:</strong> Splitting array from index ${left} to ${right}</p>`;
    await delay(speed * 15);
    
    await mergeSortHelper(arr, left, mid, container, info, speed);
    await mergeSortHelper(arr, mid + 1, right, container, info, speed);
    await merge(arr, left, mid, right, container, info, speed);
}

async function merge(arr, left, mid, right, container, info, speed) {
    if (!mergeAnimating) return;
    
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    info.innerHTML = `<p><strong>Merging:</strong> Combining subarrays [${leftArr.join(', ')}] and [${rightArr.join(', ')}]</p>`;
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (!mergeAnimating) return;
        
        createBars(container, arr);
        const bars = container.querySelectorAll('.bar');
        bars[k].classList.add('comparing');
        
        await delay(speed * 10);
        
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            info.innerHTML = `<p><strong>Merging:</strong> Taking ${leftArr[i]} from left array</p>`;
            i++;
        } else {
            arr[k] = rightArr[j];
            info.innerHTML = `<p><strong>Merging:</strong> Taking ${rightArr[j]} from right array</p>`;
            j++;
        }
        
        createBars(container, arr);
        bars[k].classList.add('swapping');
        await delay(speed * 10);
        k++;
    }
    
    while (i < leftArr.length) {
        if (!mergeAnimating) return;
        arr[k] = leftArr[i];
        createBars(container, arr);
        await delay(speed * 5);
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        if (!mergeAnimating) return;
        arr[k] = rightArr[j];
        createBars(container, arr);
        await delay(speed * 5);
        j++;
        k++;
    }
    
    info.innerHTML = `<p><strong>Merged:</strong> Subarray from index ${left} to ${right} is now sorted</p>`;
    await delay(speed * 10);
}

// ==================== BINARY SEARCH ====================
let binaryArray = [];
let binaryAnimating = false;

function initBinarySearch() {
    binaryArray = generateSortedArray();
    const container = document.getElementById('binary-visualization');
    createBars(container, binaryArray);

    document.getElementById('binary-start').addEventListener('click', startBinarySearch);
    document.getElementById('binary-reset').addEventListener('click', resetBinarySearch);
}

function resetBinarySearch() {
    binaryAnimating = false;
    binaryArray = generateSortedArray();
    const container = document.getElementById('binary-visualization');
    createBars(container, binaryArray);
    document.getElementById('binary-info').innerHTML = '<p>Click "Start" to begin the visualization</p>';
    document.getElementById('binary-start').disabled = false;
}

async function startBinarySearch() {
    if (binaryAnimating) return;
    
    binaryAnimating = true;
    document.getElementById('binary-start').disabled = true;
    const container = document.getElementById('binary-visualization');
    const info = document.getElementById('binary-info');
    const speed = 101 - document.getElementById('binary-speed').value;
    const targetInput = document.getElementById('binary-target');
    let target = parseInt(targetInput.value);
    
    // Ensure target is within range
    const min = Math.min(...binaryArray);
    const max = Math.max(...binaryArray);
    if (target < min || target > max) {
        target = binaryArray[Math.floor(binaryArray.length / 2)];
        targetInput.value = target;
    }
    
    const arr = [...binaryArray];
    let left = 0;
    let right = arr.length - 1;
    let found = false;
    let steps = 0;
    
    info.innerHTML = `<p><strong>Searching for:</strong> ${target} in sorted array</p>`;
    await delay(speed * 15);
    
    while (left <= right && binaryAnimating) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        
        createBars(container, arr);
        const bars = container.querySelectorAll('.bar');
        
        // Highlight search range
        for (let i = left; i <= right; i++) {
            bars[i].classList.add('searching');
        }
        
        bars[mid].classList.remove('searching');
        bars[mid].classList.add('comparing');
        
        info.innerHTML = `<p><strong>Step ${steps}:</strong> Checking middle element at index ${mid}: ${arr[mid]}<br>Search range: [${left}, ${right}]</p>`;
        await delay(speed * 20);
        
        if (arr[mid] === target) {
            bars[mid].classList.remove('comparing');
            bars[mid].classList.add('found');
            info.innerHTML = `<p><strong>Found!</strong> Element ${target} found at index ${mid} after ${steps} steps.<br>Binary Search is O(log n) - very efficient!</p>`;
            found = true;
            break;
        } else if (arr[mid] < target) {
            info.innerHTML = `<p><strong>Step ${steps}:</strong> ${arr[mid]} < ${target}, searching right half</p>`;
            left = mid + 1;
        } else {
            info.innerHTML = `<p><strong>Step ${steps}:</strong> ${arr[mid]} > ${target}, searching left half</p>`;
            right = mid - 1;
        }
        
        await delay(speed * 15);
    }
    
    if (!found && binaryAnimating) {
        info.innerHTML = `<p><strong>Not Found:</strong> Element ${target} is not in the array after ${steps} steps.</p>`;
    }
    
    binaryAnimating = false;
    document.getElementById('binary-start').disabled = false;
}

// Utility function for ordinal suffix
function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}
