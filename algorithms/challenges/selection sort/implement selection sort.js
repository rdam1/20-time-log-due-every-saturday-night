var swap = function(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
};

var indexOfMinimum = function(array, startIndex) {
    var minValue = array[startIndex];
    var minIndex = startIndex;
    for(var i = startIndex + 1; i < array.length; i++) {
        if(array[i] < minValue) {
            minIndex = i;
            minValue = array[i];
        }
    }
    return minIndex;
};

var selectionSort = function(array) {
    var select;
    for(select = 0; select < array.length; select++) {
        var min_index = indexOfMinimum(array, select);
        swap(array, min_index, select);
    }
};

var array = [22, 11, 99, 88, 9, 7, 42];
selectionSort(array);
println("Array after sorting: " + array);
Program.assertEqual(array, [7, 9, 11, 22, 42, 88, 99]);

var array2 = [-20, 3, 218, 95, -489, 20, 0];
selectionSort(array2);
println("Array after sorting: " + array2);
Program.assertEqual(array2, [-489, -20, 0, 3, 20, 95, 218]);
