const body = document.querySelector('body');
const balance = document.querySelector('#balance');
const currentBet = document.querySelector('#currentBet');
const win = document.querySelector('#winData');
const lost = document.querySelector('#lostData');
const totalWin = document.querySelector('#totalWinData');
const totalLost = document.querySelector('#totalLostData');
const netGain = document.querySelector('#netGain');
const container = document.querySelector('.container');
const overlay = document.querySelector('#overlay')

//Create the table
function buildBettingBoard() {

    let bettingBoard = document.createElement('div');
    bettingBoard.setAttribute('id', 'betting_board');

    let topArea = document.createElement('div');
    topArea.setAttribute('class', 'topArea');

    let wl = document.createElement('div');
    wl.setAttribute('class', 'winning_lines');

    // Create blocks stand for 00 and 0
    const zeroAreaBlock = document.createElement('div');
    zeroAreaBlock.setAttribute('id', 'zeroAreaBlock');
    zeroAreaBlock.setAttribute('class', 'zeroAreaBlock');
    zeroAreaBlock.onclick = function () {
        var num = '00' + ',' + '0';
        var objType = 'split';
        var odd = 17;
        setBet(num, objType, odd, this);
    }
    zeroAreaBlock.addEventListener('contextmenu', singleDelete);
    wl.append(zeroAreaBlock)

    //Create blocks stand for 2&3, 1&2, 5&6, 4&5...
    for (let i = 0; i < 3; i++) {
        const hLineTwoMiddleL = document.createElement('div');
        hLineTwoMiddleL.setAttribute('id', `hLineTwoMiddleL_${i}`);
        hLineTwoMiddleL.setAttribute('class', 'hLineTwoMiddleL');
        for (let j = 0; j < 12; j++) {
            var hLineTwoMiddleB = document.createElement('div');
            hLineTwoMiddleB.setAttribute('id', `hLineTwoMiddleB_${i}${j}`);
            hLineTwoMiddleB.setAttribute('class', `hLineTwoMiddleB`);
            hLineTwoMiddleB.onclick = function () {
                if (i == 0 || i == 1) {
                    var numBottom = ((2 - i) + (3 * j));
                    var numTop = ((3 - i) + (3 * j));
                    var num = numBottom + ',' + numTop;
                } else {
                    var numBottom = (1 + (3 * j));
                    var numMiddle = (2 + (3 * j));
                    var numTop = (3 + (3 * j));
                    var num = numBottom + ',' + numMiddle + ',' + numTop;
                }
                var objType = (i == 2) ? 'street' : 'split';
                var odd = (i == 2) ? 11 : 17;
                setBet(num, objType, odd, this);
            }
            hLineTwoMiddleL.append(hLineTwoMiddleB)
        }
        hLineTwoMiddleB.addEventListener('contextmenu', singleDelete);
        wl.append(hLineTwoMiddleL);
    }


    //Create blocks stand for 00&3, 3&6, 0&1, 1&4...
    for (let i = 0; i < 12; i++) {
        var vLineTwoMiddleL = document.createElement('div');
        vLineTwoMiddleL.setAttribute('id', 'vLineTwoMiddleL_' + i);
        vLineTwoMiddleL.setAttribute('class', 'vLineTwoMiddleL');
        for (let j = 0; j < 3; j++) {
            (function (i, j) { // Create a closure to capture current values of i and j
                var vLineTwoMiddleB = document.createElement('div');
                vLineTwoMiddleB.setAttribute('id', `vLineTwoMiddleB_${i}${j}`);
                vLineTwoMiddleB.setAttribute('class', 'vLineTwoMiddleB');
                vLineTwoMiddleB.onclick = function () {
                    var numLeftTop, numLeftBottom, numLeft, numRight, num, objType, odd;
                    if (i === 0 && j === 0) {
                        numLeft = '00';
                        numRight = 3;
                        num = numLeft + ',' + numRight;
                    } else if (i === 0 && j === 1) {
                        numLeftTop = '00';
                        numLeftBottom = 0;
                        numRight = 2;
                        num = numLeftTop + ',' + numLeftBottom + ',' + numRight;
                    } else if (i === 0 && j === 2) {
                        numLeft = 0;
                        numRight = 1;
                        num = numLeft + ',' + numRight;
                    } else {
                        numLeft = ((3 * i)) - (j);
                        numRight = (3 + (3 * i)) - (j);
                        num = numLeft + ',' + numRight;
                    }
                    objType = (i == 0 && j == 1) ? 'street' : 'split';
                    odd = (i == 0 && j == 1) ? 11 : 17;
                    setBet(num, objType, odd, this);
                };
                vLineTwoMiddleB.addEventListener('contextmenu', singleDelete);
                vLineTwoMiddleL.append(vLineTwoMiddleB);
            })(i, j); // Pass current values of i and j to the IIFE
        }
        wl.append(vLineTwoMiddleL);
    }

    //Create blocks for corner bets
    for (i = 0; i < 3; i++) {
        var conerBetL = document.createElement('div');
        conerBetL.setAttribute('id', 'conerBetL_' + i);
        conerBetL.setAttribute('class', 'conerBetL');
        for (let j = 0; j < 12; j++) {
            let count = (i == 0) ? j : (i == 1) ? j + 12 : j + 24;

            var conerBetB = document.createElement('div');
            conerBetB.setAttribute('id', `conerBetB_${i}${j}`);
            conerBetB.setAttribute('class', 'conerBetB');
            conerBetB.onclick = function () {
                if (count === 0) {
                    var numLeft = '00';
                    var numRightTop = 3;
                    var numRightBottom = 2;
                    var num = numLeft + ',' + numRightTop + ',' + numRightBottom;
                    var objType = 'street';
                    var odd = 11;
                } else if (count === 12) {
                    var numLeft = 0;
                    var numRightTop = 2;
                    var numRightBottom = 1;
                    var num = numLeft + ',' + numRightTop + ',' + numRightBottom;
                    var objType = 'street';
                    var odd = 11;
                } else if (count === 24) {
                    var numLeftTop = '00';
                    var numLeftBottom = 0;
                    var numRightTop = 3;
                    var numRightMiddle = 2;
                    var numRightBottom = 1;
                    var num = numLeftTop + ',' + numLeftBottom + ',' + numRightTop + ',' + numRightMiddle + ',' + numRightBottom;
                    var objType = '5_line_bet';
                    var odd = 6;
                } else if (count > 24 && count < 36) {
                    var numLeftBottom = 1;
                    var numLeftMiddle = 2;
                    var numLeftTop = 3;
                    var numRightBottom = 4;
                    var numRightMiddle = 5;
                    var numRightTop = 6;
                    var num = (parseInt(numLeftBottom) + ((count - 25) * 3)) + ',' + (parseInt(numLeftMiddle) + ((count - 25) * 3)) + ',' + (parseInt(numLeftTop) + ((count - 25) * 3)) + ',' + (parseInt(numRightBottom) + ((count - 25) * 3)) + ',' + (parseInt(numRightMiddle) + ((count - 25) * 3)) + ',' + (parseInt(numRightTop) + ((count - 25) * 3))
                    var objType = '6_line_bet';
                    var odd = 5;
                } else {
                    var numLeftBottom = 2;
                    var numLeftTop = 3;
                    var numRightBottom = 5;
                    var numRightTop = 6;
                    var num = (count >= 1 && count < 12) ? (parseInt(numLeftBottom) + ((count - 1) * 3)) + ',' + (parseInt(numLeftTop) + ((count - 1) * 3)) + ',' + (parseInt(numRightBottom) + ((count - 1) * 3)) + ',' + (parseInt(numRightTop) + ((count - 1) * 3)) : ((parseInt(numLeftBottom) - 1) + ((count - 13) * 3)) + ',' + ((parseInt(numLeftTop) - 1) + ((count - 13) * 3)) + ',' + ((parseInt(numRightBottom) - 1) + ((count - 13) * 3)) + ',' + ((parseInt(numRightTop) - 1) + ((count - 13) * 3));
                    var objType = 'corner_bet';
                    var odd = 8;
                };
                setBet(num, objType, odd, this);
            };
            conerBetB.addEventListener('contextmenu', singleDelete);
            conerBetL.append(conerBetB);
        };
        wl.append(conerBetL);
    };

    //Create numberBoard
    const numberBoard = document.createElement('div');
    numberBoard.setAttribute('class', 'number_board');

    //Create zero area
    const zero = document.createElement('div');
    zero.setAttribute('class', 'zeroArea');
    const listofZero = ['00', '0']
    for (let i = 0; i < listofZero.length; i++) {
        const zeroBlock = document.createElement('div');
        zeroBlock.setAttribute('id', `zeroBlock_${i}`);
        zeroBlock.setAttribute('class', 'zeroBlock');
        zeroBlock.onclick = function () {
            var num = listofZero[i];
            var odd = 35;
            var objType = 'straight'
            setBet(num, objType, odd, this);
        };
        zeroBlock.addEventListener('contextmenu', singleDelete);
        const zeroBlockNum = document.createElement('div');
        zeroBlockNum.setAttribute('class', 'zeroBlockNum');
        zeroBlockNum.innerText = listofZero[i];
        zeroBlock.append(zeroBlockNum);
        zero.append(zeroBlock);
    };
    topArea.append(zero);

    //Create other number block area
    const otherNumber = document.createElement('div');
    otherNumber.setAttribute('class', 'otherNumber');

    const listofNumber = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2-1', 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2-1', 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2-1'];
    for (let i = 0; i < 3; i++) {
        const otherNumberRow = document.createElement('div');
        otherNumberRow.setAttribute('id', `otherNumberRow_${i}`);
        otherNumberRow.setAttribute('class', 'otherNumberRow');
        const listInEachRow = listofNumber.slice(13 * i, 13 * (i + 1));

        for (let j = 0; j < 13; j++) {
            const otherNumberBlock = document.createElement('div');
            otherNumberBlock.setAttribute('class', 'otherNumberBlock');
            otherNumberBlock.setAttribute('id', `otherNumberBlock_${i}${j}`);

            otherNumberBlock.onclick = (function (index) {
                return function () {
                    if (index !== 12) {
                        var num = '' + listInEachRow[index] + ''
                        setBet(num, 'straight', 35, this);
                    } else {
                        setBet(listInEachRow.slice(0, -1).join(','), 'column', 2, this)
                    }
                };
            })(j);
            otherNumberBlock.addEventListener('contextmenu', singleDelete);
            
            const otherNumberBlockNum = document.createElement('div');
            otherNumberBlockNum.setAttribute('class', 'otherNumberBlockNum');
            otherNumberBlockNum.innerText = listInEachRow[j];

            otherNumberBlock.append(otherNumberBlockNum);
            otherNumberRow.append(otherNumberBlock);
        }
        otherNumber.append(otherNumberRow);
    }
    topArea.append(otherNumber);
    numberBoard.append(topArea);

    // create the second bottom area (1 to 12, 13 to 24, 25 to 36)
    //generate an array contains number from 1 to 36
    const arrayofNumber = Array.from({ length: 36 }, (_, index) => index + 1);
    const secondBottom = document.createElement('div');
    secondBottom.setAttribute('class', 'secondBottom');
    const arrayofSecondBottom = ['1 to 12', '13 to 24', '25 to 36'];
    for (let i = 0; i < 3; i++) {
        const secondBottomBlock = document.createElement('div');
        secondBottomBlock.setAttribute('id', `secondBottomBlock_${i}`);
        secondBottomBlock.setAttribute('class', 'secondBottomBlock');
        secondBottomBlock.onclick = function () {
            setBet(arrayofNumber.filter(num => (num > (12 * i) && num <= (12 * (i + 1)))).join(','), 'dozen', 2, this);
        }
        secondBottomBlock.addEventListener('contextmenu', singleDelete);
        const secondBottomBlockCon = document.createElement('div');
        secondBottomBlockCon.setAttribute('class', 'secondBottomBlockCon');
        secondBottomBlockCon.innerText = arrayofSecondBottom[i];
        secondBottomBlock.append(secondBottomBlockCon);
        secondBottom.append(secondBottomBlock);
    }
    numberBoard.append(secondBottom);

    //create the lastBottom area (Odd, Even, Red, Black, 1 to 18, 19 - 36)
    const lastBottom = document.createElement('div');
    lastBottom.setAttribute('class', 'lastBottom');
    const arrayofLastBottom = ['1 to 18', 'Even', 'Red', 'Black', 'Odd', '19 to 36'];
    for (let i = 0; i < 6; i++) {
        const lastBottomBlock = document.createElement('div');
        lastBottomBlock.setAttribute('id', `lastBottomBlock_${i}`);
        lastBottomBlock.setAttribute('class', 'lastBottomBlock');
        lastBottomBlock.onclick = function () {
            var num = (i === 0) ? arrayofNumber.filter(num => num <= 18).join(',') :
                (i === 1) ? arrayofNumber.filter(num => num % 2 === 0).join(',') :
                    (i === 2) ? '1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36' :
                        (i === 3) ? '2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35' :
                            (i === 4) ? arrayofNumber.filter(num => num % 2 !== 0).join(',') :
                                arrayofNumber.filter(num => num > 18).join(',');
            setBet(num, 'oerb', 1, this)
        }
        lastBottomBlock.addEventListener('contextmenu', singleDelete);
        const lastBottomBlockCon = document.createElement('div');
        lastBottomBlockCon.setAttribute('class', 'lastBottomBlockCon');
        lastBottomBlockCon.innerText = arrayofLastBottom[i];
        lastBottomBlock.append(lastBottomBlockCon);
        lastBottom.append(lastBottomBlock);
    }
    numberBoard.append(lastBottom);
    bettingBoard.append(numberBoard);
    bettingBoard.append(wl);
    container.append(bettingBoard);
}

//Remove all visual effect of the winning number when place chip
function removeWinningNumber() {
    zeroBlockNumDOMs.forEach(dom => {
        dom.parentNode.classList.remove('winningNumber')
    })
    otherNumberBlockNumDOMs.forEach(dom => {
        dom.parentNode.classList.remove('winningNumber')
    })
}

var singleChipValue = 100;
let selectedCombination = [];

function setBet(num, objType, odd, clickedElement){
    removeWinningNumber();
    partialResetTable();
   if(selectedCombination.length == 0){
    removeAllChips();
   }
  
   if(balanceValue >= singleChipValue){
   if (!clickedElement.classList.contains('selected')){
        clickedElement.classList.add('selected');
       const chip = document.createElement('div');
       chip.style.userSelect = 'none';
       chip.setAttribute('class', 'chip');
       let item = {
            id: clickedElement.id,
            num: num.split(','),
            objType: objType,
            odd: odd,
            value: singleChipValue,
            }
        selectedCombination.push(item);
        chip.innerText = singleChipValue;
        clickedElement.append(chip);
        calCurrentBetBalance();
    } else {
        let reselectedDiv = selectedCombination.find(item => {
        return item.id === clickedElement.id;
    })

    reselectedDiv.value += singleChipValue;
    clickedElement.lastChild.innerText = reselectedDiv.value;
    calCurrentBetBalance();
   } 
}
};

function removeAllChips(){
    document.querySelectorAll('.chip').forEach(chip => {
        chip.remove();
    });
}

//Right click to remove current betting
function singleDelete(e){
    e.preventDefault();
    if(this.querySelector('.chip'))
    this.querySelector('.chip').remove()
    
    if(selectedCombination.filter(item=>item.id == this.id).length!==0){
    let valueOnThisBlock = selectedCombination.filter(item=>item.id == this.id)[0].value;
    currentBetValue -= valueOnThisBlock;
    currentBet.innerText = currentBetValue;
    balanceValue += valueOnThisBlock;
    balance.innerText = balanceValue;
    }
    this.classList.remove('selected')
    selectedCombination = selectedCombination.filter(item => item.id !== this.id);
}

buildBettingBoard()


////////////////////////
// WHEEL AND SPIN AREA//
////////////////////////

const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn')

const rotationValues = [
    { miniDegree: 0, maxDegree: 4.737, value: '00' },
    { miniDegree: 4.738, maxDegree: 14.212, value: '1' },
    { miniDegree: 14.213, maxDegree: 23.686, value: '13' },
    { miniDegree: 23.687, maxDegree: 33.161, value: '36' },
    { miniDegree: 33.162, maxDegree: 42.636, value: '24' },
    { miniDegree: 42.637, maxDegree: 52.11, value: '3' },
    { miniDegree: 52.111, maxDegree: 61.585, value: '15' },
    { miniDegree: 61.586, maxDegree: 71.06, value: '34' },
    { miniDegree: 71.061, maxDegree: 80.534, value: '22' },
    { miniDegree: 80.535, maxDegree: 90.009, value: '5' },
    { miniDegree: 90.01, maxDegree: 99.484, value: '17' },
    { miniDegree: 99.485, maxDegree: 108.958, value: '32' },
    { miniDegree: 108.959, maxDegree: 118.433, value: '20' },
    { miniDegree: 118.434, maxDegree: 127.908, value: '7' },
    { miniDegree: 127.909, maxDegree: 137.383, value: '11' },
    { miniDegree: 137.384, maxDegree: 146.857, value: '30' },
    { miniDegree: 146.858, maxDegree: 156.332, value: '26' },
    { miniDegree: 156.333, maxDegree: 165.807, value: '9' },
    { miniDegree: 165.808, maxDegree: 175.281, value: '28' },
    { miniDegree: 175.282, maxDegree: 184.756, value: '0' },
    { miniDegree: 184.757, maxDegree: 194.231, value: '2' },
    { miniDegree: 194.232, maxDegree: 203.705, value: '14' },
    { miniDegree: 203.706, maxDegree: 213.18, value: '35' },
    { miniDegree: 213.181, maxDegree: 222.655, value: '23' },
    { miniDegree: 222.656, maxDegree: 232.129, value: '4' },
    { miniDegree: 232.13, maxDegree: 241.604, value: '16' },
    { miniDegree: 241.605, maxDegree: 251.079, value: '33' },
    { miniDegree: 251.08, maxDegree: 260.553, value: '21' },
    { miniDegree: 260.554, maxDegree: 270.028, value: '6' },
    { miniDegree: 270.029, maxDegree: 279.503, value: '18' },
    { miniDegree: 279.504, maxDegree: 288.978, value: '31' },
    { miniDegree: 288.979, maxDegree: 298.452, value: '19' },
    { miniDegree: 298.453, maxDegree: 307.927, value: '8' },
    { miniDegree: 307.928, maxDegree: 317.402, value: '12' },
    { miniDegree: 317.403, maxDegree: 326.876, value: '29' },
    { miniDegree: 326.877, maxDegree: 336.351, value: '25' },
    { miniDegree: 336.352, maxDegree: 345.826, value: '10' },
    { miniDegree: 345.827, maxDegree: 355.300, value: '27' },
    { miniDegree: 355.301, maxDegree: 360, value: '00' },
]

//Data size
const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
const innerData = [1, 1, 1, 1, 1, 1, 1, 1]

//Background color for each piece of the wheel
var pieColors = ['green', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black']
var innerPieColors = ['rgb(120, 36, 36)']

//Create the chart
let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: 'pie',
    data: {
        labels: ['00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2', '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1'],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
            {
                backgroundColor: innerPieColors,
                data: innerData,
                datalabels: { // Hide data labels for this dataset
                    display: false
                },
                rotation: 4.737,
            },
        ],
    },

    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                offset: -45,
                color: '#ffffff',
                formatter: (_, context) =>
                    context.chart.data.labels[context.dataIndex],
                font: { size: 18, weight: 'bolder' },
                rotation: (context) =>
                    context.dataIndex * (360 / context.chart.data.labels.length) +
                    360 / context.chart.data.labels.length / 2 +
                    context.chart.options.rotation,
            },
        },
    },
},
)

//Start the spinning animation
function startSpin() {
    if (selectedCombination.length === 0) return;
    let startAngle = myChart.options.rotation % 360 || 0;
    let endAngle = parseFloat((Math.random() * (4000 - 3000) + 3000).toFixed(3));
    let resultAgnle = endAngle % 360;
    let startTime = performance.now();
    let duration = 8000; // 
    spinBtn.disabled = true;
    deleteAll.disabled = true;
    restartBtn.disabled = true;

    function animate() {
        let elapsedTime = performance.now() - startTime;
        let progress = Math.min(elapsedTime / duration, 1);
        //Ease-out effect
        progress = 1 - Math.pow(1 - progress, 2); // Ease-out function: 1 - (1 - t)^2
        let currentAngle = startAngle + (endAngle - startAngle) * progress;

        myChart.options.rotation = currentAngle;
        myChart.update();
        // Run animate() until the progress reaches 1
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
    
    //Return the result after the animation ends
    setTimeout(() => {
        showResult(rotationValues, resultAgnle);
        spinBtn.disabled = false;
        deleteAll.disabled = false;
        restartBtn.disabled = false;
    }, 8200)
    removeAllSelectedClasses();
}

//Return the result of each spin
function showResult(dataArray, resultAgnle) {
    dataArray.forEach(row => {
        if (resultAgnle > row.miniDegree && resultAgnle < row.maxDegree) {
            console.log(row.value)
            calculateResult(row.value)
            renderBettingArea(row.value)
        }
    }
    )
    selectedCombination = [];
}

//Remove all selected class after spin
function removeAllSelectedClasses() {
    document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected');
    });
}

let moneyEarned = 0;
function calculateResult(value) {
    selectedCombination.forEach(selection => {
        if (selection.num.includes(value.toString())) {
            console.log('you won the game!');
            moneyEarned = moneyEarned + selection.value * selection.odd;
            console.log(moneyEarned);
            winValue = moneyEarned;
            win.innerText = winValue;
        }
    });

    lostValue = currentBetValue;
    lost.innerText = lostValue;
    netGainValue = winValue - currentBetValue;
    netGain.innerText = netGainValue;
    balanceValue += netGainValue + currentBetValue;
    totalWinValue += winValue;
    totalWin.innerText = totalWinValue;
    totalLostValue += lostValue;
    totalLost.innerText = totalLostValue;
    balance.innerText = balanceValue;
    currentBetValue = initialCurrentBet;
    currentBet.innerText = currentBetValue;
    if(balanceValue == 0){
        body.classList.add('active');
        overlay.classList.add('active');
    }
}

const otherNumberBlockNumDOMs = document.querySelectorAll('.otherNumberBlockNum');
const zeroBlockNumDOMs = document.querySelectorAll('.zeroBlockNum');

//Add visual effect on the winning number on the betting area
function renderBettingArea(value) {
    zeroBlockNumDOMs.forEach(num => {
        if (num.innerText == value) {
            num.parentNode.classList.add('winningNumber')
        }
    })
    otherNumberBlockNumDOMs.forEach(num => {
        if (num.innerText == value) {
            num.parentNode.classList.add('winningNumber')
        }
    })
}

spinBtn.addEventListener('click', startSpin)


////////////////////////
// OTHER BUTTONS AREA///
////////////////////////

//Change the value of chip
const chipforDemo = document.querySelectorAll('.chipforDemo')
chipforDemo.forEach(chip => chip.addEventListener('click', function() {
    singleChipValue = parseInt(chip.dataset.value);
    chipforDemo.forEach(chip=>{
        if(chip!==this){
            chip.classList.remove('selectedChip')
        }
    })
     chip.classList.toggle('selectedChip')

}))

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', restart)

//Delete all chips from the table
const deleteAll = document.querySelector('#deleteAll');
deleteAll.addEventListener('click',()=>{
    removeAllChips();
    removeAllSelectedClasses();
    partialResetTable();
    selectedCombination = [];
    balanceValue += currentBetValue;
    balance.innerText = balanceValue;
    currentBetValue = initialCurrentBet;
    currentBet.innerText = currentBetValue;
})


////////////////////////
////// TABLE AREA///////
////////////////////////

const initialCurrentBet = 0;
const initialBalance = 10000;
const initialWin = 0;
const initialLost = 0;
const initialNetGain = 0;
const initialTotalWin = 0;
const initialTotalLost = 0;
let currentBetValue;
let balanceValue = initialBalance;
let winValue;
let lostValue;
let netGainValue;
let totalWinValue = initialWin;
let totalLostValue = initialLost;

function calCurrentBetBalance(){
    currentBetValue =  selectedCombination.reduce((acc,item) => acc + parseInt(item.value), initialCurrentBet)
   currentBet.innerText = currentBetValue;
   balanceValue -= singleChipValue;
   balance.innerText = balanceValue;

}

function partialResetTable(){
    moneyEarned = 0;
    winValue = initialWin;
    win.innerText = winValue;
    lostValue = initialLost;
    lost.innerText = lostValue;
    netGainValue = initialNetGain;
    netGain.innerText = netGainValue;
}


///////////////////////////
////// POP UP WINDOW///////
///////////////////////////

function createPopUP(){
    const popUp = document.createElement('div');
    popUp.setAttribute('class', 'popUp');
    const popUpBody = document.createElement('div');
    popUpBody.setAttribute('class', 'popUpBody');
    popUpBody.innerText = 'You are bankrupt, you can restart the game'
    const restartGame = document.createElement('button');
    restartGame.setAttribute('class', 'restartGame');
    restartGame.innerText = 'Restart';
    restartGame.addEventListener('click', restart)
    popUp.append(popUpBody);
    popUp.append(restartGame);
    body.append(popUp);
}

function restart(){
    removeAllChips();
    removeAllSelectedClasses();
    removeWinningNumber();
    partialResetTable();
    balanceValue = initialBalance;
    balance.innerText = balanceValue;
    totalWinValue = initialTotalWin;
    totalWin.innerText = totalWinValue;
    totalLostValue = initialTotalLost;
    totalLost.innerText = totalLostValue;
    body.classList.remove('active');
    overlay.classList.remove('active');
}

createPopUP()