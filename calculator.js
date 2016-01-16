"use strict";
/* ------------------------------------------------------------------------------
   ФУНКЦИЯ-КОНСТРУКТОР ДЛЯ КАЛЬКУЛЯТОРА
   ----------------------------------------------------------------------------*/
function Calculator() {
	
	var mainContainer,    // Основной контейнер для размещения всех элементов
	    indicator,        // Контейнер для элементов индикатора
		upperLine,        // Контейнер для отображение промежуточных результатов
		                  // расчетов в верхней строке индикатора
		lowerLine,        // Нижняя строка индикатора (текущее число)
		memoryIndicator,  // Индикатор состояния памяти в верхней строке главного индикатора
		
		currentNumber = 0,
		previousNumber = 0,
		currentOperator = "",
		memoryValue = 0,
		maxLength = 16;
/*-----------------  Описание клавиш калькулятора -----------------------------*/	
	var element0 = {
		typeOfElement: "numeric", innerValue: "0", coordinateX: 4, coordinateY: 267, dimensionX: 85, dimensionY: 35	};
	var element1 = {
		typeOfElement: "numeric", innerValue: "1", coordinateX: 4, coordinateY: 230, dimensionX: 42, dimensionY: 35	};
	var element2 = {
		typeOfElement: "numeric", innerValue: "2", coordinateX: 48, coordinateY: 230, dimensionX: 42, dimensionY: 35};
	var element3 = {
		typeOfElement: "numeric", innerValue: "3", coordinateX: 92, coordinateY: 230, dimensionX: 42, dimensionY: 35};
	var element4 = {
		typeOfElement: "numeric", innerValue: "4", coordinateX: 4, coordinateY: 193, dimensionX: 42, dimensionY: 35};
	var element5 = {
		typeOfElement: "numeric", innerValue: "5", coordinateX: 48, coordinateY: 193, dimensionX: 42, dimensionY: 35};
	var element6 = {
		typeOfElement: "numeric", innerValue: "6", coordinateX: 92, coordinateY: 193, dimensionX: 42, dimensionY: 35};
	var element7 = {
		typeOfElement: "numeric", innerValue: "7", coordinateX: 4, coordinateY: 156, dimensionX: 42, dimensionY: 35};
	var element8 = {
		typeOfElement: "numeric", innerValue: "8", coordinateX: 48, coordinateY: 156, dimensionX: 42, dimensionY: 35};
	var element9 = {
		typeOfElement: "numeric", innerValue: "9", coordinateX: 92, coordinateY: 156, dimensionX: 42, dimensionY: 35};
	var elementPoint = {
		typeOfElement: "numeric", innerValue: ".", coordinateX: 92, coordinateY: 267, dimensionX: 42, dimensionY: 35};	
	var elementPlus = {
		typeOfElement: "binarOperation", innerValue: "+", coordinateX: 136, coordinateY: 267, dimensionX: 42, dimensionY: 35};
	var elementMinus = {
		typeOfElement: "binarOperation", innerValue: "-", coordinateX: 136, coordinateY: 230, dimensionX: 42, dimensionY: 35};
	var elementMult = {
		typeOfElement: "binarOperation", innerValue: "*", coordinateX: 136, coordinateY: 193, dimensionX: 42, dimensionY: 35};
	var elementDiv = {
		typeOfElement: "binarOperation", innerValue: "/", coordinateX: 136, coordinateY: 156, dimensionX: 42, dimensionY: 35};
	var elementEq = {
		typeOfElement: "result", innerValue: "=", coordinateX: 180, coordinateY: 230, dimensionX: 42, dimensionY: 72};		
	var elementCE = {
		typeOfElement: "correction", innerValue: "CE", coordinateX: 4, coordinateY: 119, dimensionX: 42, dimensionY: 35};	
	var elementBS = {
		typeOfElement: "correction", innerValue: "&#8592", coordinateX: 48, coordinateY: 119, dimensionX: 86, dimensionY: 35};	
	var elementC = {
		typeOfElement: "correction", innerValue: "C", coordinateX: 4, coordinateY: 82, dimensionX: 42, dimensionY: 35};	
	var elementInv = {
		typeOfElement: "unarOperation", innerValue: "+/-", coordinateX: 136, coordinateY: 119, dimensionX: 42, dimensionY: 35};	
	var elementSqr = {
		typeOfElement: "unarOperation", innerValue: "Sqr", coordinateX: 180, coordinateY: 119, dimensionX: 42, dimensionY: 35};	
	var elementPercent = {
		typeOfElement: "binarOperation", innerValue: "%", coordinateX: 180, coordinateY: 193, dimensionX: 42, dimensionY: 35};	
	var elementRevers = {
		typeOfElement: "unarOperation", innerValue: "1/x", coordinateX: 180, coordinateY: 156, dimensionX: 42, dimensionY: 35};		
	var elementMC = {
		typeOfElement: "memory", innerValue: "MC", coordinateX: 48, coordinateY: 82, dimensionX: 42, dimensionY: 35}	
	var elementMR = {
		typeOfElement: "memory", innerValue: "MR", coordinateX: 92, coordinateY: 82, dimensionX: 42, dimensionY: 35}
	var elementMPlus = {
		typeOfElement: "memory", innerValue: "M+", coordinateX: 136, coordinateY: 82, dimensionX: 42, dimensionY: 35}
	var elementMMinus = {
		typeOfElement: "memory", innerValue: "M-", coordinateX: 180, coordinateY: 82, dimensionX: 42, dimensionY: 35}	
	var elementRemove = {
		typeOfElement: "winManager", innerValue: "X", coordinateX: 180, coordinateY: 3, dimensionX: 42, dimensionY: 15}		
	var elementMinimize = {
		typeOfElement: "winManager", innerValue: "__", coordinateX: 136, coordinateY: 3, dimensionX: 42, dimensionY: 15}
	var elementView = {
		typeOfElement: "winManager", innerValue: "Вид", coordinateX: 4, coordinateY: 3, dimensionX: 60, dimensionY: 15}		

/*--------- Вспомогательные массивы для обработчиков событий клавиатуры ---------*/
	var numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
	var binarKeys = ["+", "-", "*", "/"];
	var resultKey = "=";
	var correctionKeysCodes = [27, 46, 8];
	var correctionKeysValues = ["C", "CE", "←"];
	
/*----------------------- Построение DOM калькулятора ---------------------------*/	
	function render() {
		mainContainer = document.createElement("div");
		mainContainer.className = "mainContainer";
		document.body.appendChild(mainContainer);
		
		indicator = document.createElement("div");
		indicator.className = "indicator";
		mainContainer.appendChild(indicator)
		
		upperLine = document.createElement("div");
		upperLine.className = "upperLine";
		upperLine.innerHTML = "";
		indicator.appendChild(upperLine)
		
		lowerLine= document.createElement("div");
		lowerLine.className = "lowerLine";
		lowerLine.innerHTML = "0";
		indicator.appendChild(lowerLine);
		
		memoryIndicator= document.createElement("div");
		memoryIndicator.className = "memoryIndicator";
		memoryIndicator.innerHTML = "";
		indicator.appendChild(memoryIndicator);		
		
		mainContainer.appendChild(createButton( element0 ));
		mainContainer.appendChild(createButton( element1 ));
		mainContainer.appendChild(createButton( element2 ));
		mainContainer.appendChild(createButton( element3 ));
		mainContainer.appendChild(createButton( element4 ));
		mainContainer.appendChild(createButton( element5 ));
		mainContainer.appendChild(createButton( element6 ));
		mainContainer.appendChild(createButton( element7 ));
		mainContainer.appendChild(createButton( element8 ));
		mainContainer.appendChild(createButton( element9 ));
		mainContainer.appendChild(createButton( elementPoint ));
		mainContainer.appendChild(createButton( elementPlus ));
		mainContainer.appendChild(createButton( elementMinus ));
		mainContainer.appendChild(createButton( elementMult ));
		mainContainer.appendChild(createButton( elementDiv ));
		mainContainer.appendChild(createButton( elementEq ));
		mainContainer.appendChild(createButton( elementCE ));
		mainContainer.appendChild(createButton( elementBS ));		
		mainContainer.appendChild(createButton( elementC ));		
		mainContainer.appendChild(createButton( elementInv ));		
		mainContainer.appendChild(createButton( elementSqr ));		
		mainContainer.appendChild(createButton( elementPercent ));		
		mainContainer.appendChild(createButton( elementRevers ));
		mainContainer.appendChild(createButton( elementMR ));
		mainContainer.appendChild(createButton( elementMC ));
		mainContainer.appendChild(createButton( elementMPlus ));
		mainContainer.appendChild(createButton( elementMMinus ));
		mainContainer.appendChild(createButton( elementRemove ));
		mainContainer.appendChild(createButton( elementMinimize ));		
		mainContainer.appendChild(createButton( elementView ));		
	};
	/* -------------------------------------------------------------------------------*/
	/* --------------------- ОБРАБОТЧИКИ СОБЫТИЙ НА КАЛЬКУЛЯТОРЕ----------------------*/
	/* -------------------- Обработчик событий мыши  ---------------------------------*/
	function clickHandler (event) {
		
		var clickedElement = event.target;
		
		if (clickedElement.classList.contains('button')) {
			var classArray = clickedElement.className.split(' ');
			switch(classArray[1]){
				case "numeric":
					numericHandler(clickedElement);
					break;
				case "result":
					resultHandler(clickedElement);
					break;
				case "correction":
					correctionHandler(clickedElement);
					break;
				case "unarOperation":
					unarOperationHandler(clickedElement);
					break;			
				case "binarOperation":
					binarOperationHandler(clickedElement);
					break;
				case "memory":
					memoryHandler(clickedElement);
					break;
				case "winManager":
					winManagerHandler(clickedElement);
					break;					
			};		
		};
		
	};
	/* ------------------ Обработчик нажатия символьных клавиш  -----------------*/	
	function keypressHandler(event) {
		
		var element = {
			innerHTML: "",
			typeOf:    "defaultType"
		};
		
		var currentChar = getChar (event);
		
		for (var i = 0; i < numericKeys.length; i++) {
			if(currentChar == numericKeys[i]) {
				element.typeOf = "numeric";
				element.innerHTML = currentChar;
				break;
			};
		};
		
		for (var i = 0; i < binarKeys.length; i++) {
			if(currentChar == binarKeys[i]) {
				element.typeOf = "binarOperation";
				element.innerHTML = currentChar;
				break;
			};
		};	
		
		if(currentChar == resultKey) {
			element.typeOf = "result";
			element.innerHTML = currentChar;
		};
		
		switch(element.typeOf){
			case "numeric":
				numericHandler(element);
				break;
			case "result":
				resultHandler(element);
				break;			
			case "binarOperation":
				binarOperationHandler(element);
				break;				
		};		
	};
	/* ------------------ Обработчик нажатия управляющих клавиш  -----------------*/		
	function keyupHandler(event) {
		for (var i = 0; i < correctionKeysCodes.length; i++) {
			if (event.keyCode == correctionKeysCodes[i]) {
				var element = {
					innerHTML: correctionKeysValues[i],
				};
				correctionHandler(element);
				break;
			};
		};
	};
	/* -------------------------------------------------------------------------------*/
	/* ------------- ФУНКЦИИ, РЕАЛИЗУЮЩИЕ ФУНКЦИОНАЛЬНОСТЬ (ПЛОХОЙ РУССКИЙ)-----------*/
	/* ------ Действия, при нажатии цифровых клавиш на калькуляторе  -----------------*/	
	function numericHandler(elem) {
		if(lowerLine.innerHTML.length >= maxLength) return;
		if(lowerLine.innerHTML == "0") {
			if(elem.innerHTML == "0") return;
			if(elem.innerHTML == ".") {
				lowerLine.innerHTML += elem.innerHTML;	
				return;
			}
			lowerLine.innerHTML = elem.innerHTML;
			return;
		}
		if(elem.innerHTML == ".") {
			if(~lowerLine.innerHTML.indexOf(".")) return;
		};
		lowerLine.innerHTML += elem.innerHTML;		
	};
	/* ------ Действия, при нажатии клавиши "равно" ("=") на калькуляторе  -----------*/	
	function resultHandler (elem) {
		if(currentOperator == "") return;
		currentNumber = +lowerLine.innerHTML;
		currentNumber = madeBinarOperation(previousNumber, currentNumber, currentOperator);
		lowerLine.innerHTML = ("" + currentNumber).slice(0, maxLength);
		currentOperator = "";
		upperLine.innerHTML = "";
	};
	/* ------ Действия, при нажатии клавиш коррекции на калькуляторе  -----------------*/
	function correctionHandler(elem) {
		switch(elem.innerHTML) {
			case "←":
				if(lowerLine.innerHTML == "0") {
				return;
				};
				var currentValueLength = lowerLine.innerHTML.length;
				if(currentValueLength == 1) {
					lowerLine.innerHTML = "0";
				} else {
					lowerLine.innerHTML = lowerLine.innerHTML.slice(0,(currentValueLength - 1));
				};
				break;
			case "CE":
				lowerLine.innerHTML = "0";
				break;
			case "C":
				upperLine.innerHTML = "";
				previousNumber = 0;
				currentOperator = "";
				lowerLine.innerHTML = "0";
				break;
		};
	};
	/* ------ Действия, при нажатии клавиш унарных операций на калькуляторе  ----------*/
	function unarOperationHandler(elem) {
		currentNumber = +lowerLine.innerHTML;
		switch(elem.innerHTML) {
			case "+/-":
				currentNumber *= (-1);
				lowerLine.innerHTML = ("" + currentNumber).slice(0, maxLength);
				break;
			case "Sqr":
				if(currentNumber > 0) {
					currentNumber = Math.sqrt(currentNumber);
					lowerLine.innerHTML = ("" + currentNumber).slice(0, maxLength);
				};			
				break;
			case "1/x":
				if(currentNumber == 0) {
					alert("На ноль делить нельзя !");
					return;
				} else {
					currentNumber = 1 / currentNumber;
					lowerLine.innerHTML = ("" + currentNumber).slice(0, maxLength);					
				};			
				break;				
		};
	};	
	/* ------ Действия, при нажатии клавиш бинарных операций на калькуляторе  ----------*/	
	function binarOperationHandler(elem) {
		if(upperLine.innerHTML == "") {
			currentOperator = elem.innerHTML;
			previousNumber = +lowerLine.innerHTML;			
		} else {
			currentNumber = +lowerLine.innerHTML;
			previousNumber = madeBinarOperation(previousNumber, currentNumber, currentOperator);
			currentOperator = elem.innerHTML;	
		};
		upperLine.innerHTML = ("" + previousNumber).slice(0, maxLength) + currentOperator;
		lowerLine.innerHTML = "0";
	};	
	/* ------ Действия, при нажатии клавиш управления памятью на калькуляторе  ----------*/		
	function memoryHandler(elem) {
		switch(elem.innerHTML) {
			case "M+":
				memoryValue += +lowerLine.innerHTML;
				if(memoryIndicator.innerHTML == "") {
					memoryIndicator.innerHTML = "MEMORY";
				};
				break;
			case "M-":
				memoryValue -= +lowerLine.innerHTML;
				if(memoryIndicator.innerHTML == "") {
					memoryIndicator.innerHTML = "MEMORY";
				}				
				break;
			case "MC":
				memoryValue = 0;
				if(memoryIndicator.innerHTML == "MEMORY") {
					memoryIndicator.innerHTML = "";
				};
				break;
			case "MR":
				lowerLine.innerHTML = ("" + memoryValue).slice(0, maxLength);
				break;
		};	
	};	
	/* ------ Действия, при нажатии клавиш управления видом и состоянием окна  ----------*/	
	function winManagerHandler(elem) {
		switch(elem.innerHTML) {
			case "X":
				mainContainer.parentElement.removeChild(mainContainer);
				break;
			case "__":
				mainContainer.hidden = true;
				madeSmallContainer(mainContainer);
				break;
			case "Вид":
				madeViewChooseContainer(mainContainer);
				break;				
		};
	};	
	/* ------------------------------------------------------------------------------------*/
		
	render();
	
	mainContainer.addEventListener("click", clickHandler);	
	mainContainer.addEventListener("keypress", keypressHandler);	
	mainContainer.addEventListener("keyup", keyupHandler);	
	
};
/* ----------------------------------------------------------------------------------------*/
/* --------------------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ------------------------------------------*/
/* -------------- 	Формирование клавиши в DOM калькулятора  ------------------------------*/
function createButton(elementButton) {
		
	var newButton = document.createElement("button");

	newButton.classList.add("button");
	newButton.classList.add(elementButton.typeOfElement);
	newButton.style.top = elementButton.coordinateY + 'px';
	newButton.style.left = elementButton.coordinateX + 'px';
	newButton.style.width = elementButton.dimensionX + 'px';
	newButton.style.height = elementButton.dimensionY + 'px';
	newButton.innerHTML = elementButton.innerValue;
	
	return newButton;
};
/* -------------- 	Функция выполнения бинарной операции  --------------------------------*/	
function madeBinarOperation(number1, number2, operator) {
	switch(operator) {
		case "+": 
			return  number1 + number2;
		case "-":
			return  number1 - number2;
		case "/": 
			if (number2 == 0){
				alert("На ноль делить нельзя !");
				return number1;
			} else {
				return  number1 / number2;
			};
		case "*": 
			return number1 * number2;
		case "%": 
			if (number2 == 0){
				alert("На ноль делить нельзя !");
				return number1;
			} else {
				return  100 * number1 / number2;
			};
		};	
	};	
/* -------------- 	Функция получение символа с клавиатупы (ИЗ УЧЕБНИКА)-------------*/
function getChar(event) {
  if (event.which == null) {                      
    if (event.keyCode < 32) return null;          
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) {   
    if (event.which < 32) return null;            
    return String.fromCharCode(event.which);      
  }

  return null;                                     
}
/* ----------------------------------------------------------------------------------------*/
/* ---	ФУНКЦИЯ ФОРМИРОВАНИЯ "СВЕРНУТОГО" ВИДА С СООТВЕТСТВУЮЩИМИ ОБРАБОТЧИКАМИ -----------*/	
function madeSmallContainer (mainElement) {
	var smallContainer;
	var elementRemove = {
		typeOfElement: "winManager", innerValue: "X", coordinateX: 180, coordinateY: 3, dimensionX: 42, dimensionY: 15}		
	var elementMaximize = {
		typeOfElement: "winManager", innerValue: "&#9744", coordinateX: 136, coordinateY: 3, dimensionX: 42, dimensionY: 15}	
	
	smallContainer = document.createElement("div");
	smallContainer.className = "smallContainer";
	document.body.appendChild(smallContainer);
		
	smallContainer.appendChild(createButton( elementRemove ));
	smallContainer.appendChild(createButton( elementMaximize ));

	smallContainer.addEventListener("click", smallClickHandler);	
	
	function smallClickHandler (event) {
		
		var clickedElement = event.target;
		
		if (clickedElement.classList.contains('button')) {
			switch(clickedElement.innerHTML) {
				case "X":
					mainElement.parentElement.removeChild(mainElement);
					smallContainer.parentElement.removeChild(smallContainer);
					break;
				case "☐":
					mainElement.hidden = false;
					smallContainer.parentElement.removeChild(smallContainer);
					break;
			};		
		};
	};	
};
/* ----------------------------------------------------------------------------------------*/
/* ---	ФУНКЦИЯ ФОРМИРОВАНИЯ ОКНА УПРАВЛЕНИЯ ВИДОМ КАЛЬКУЛЯТОРА  --------------------------*/
/* ---	С СООТВЕТСТВУЮЩИМИ ОБРАБОТЧИКАМИ --------------------------------------------------*/
function madeViewChooseContainer (mainElement) {
	
	var viewChooseContainer;
	
	var elementCommon = {
		typeOfElement: "viewChooseButton", innerValue: "ОБЫЧНЫЙ", coordinateX: 3, coordinateY: 3, dimensionX: 70, dimensionY: 15};		
	var elementSimple = {
		typeOfElement: "viewChooseButton", innerValue: "ПОПРОЩЕ", coordinateX: 3, coordinateY: 21, dimensionX: 70, dimensionY: 15};	
		
	viewChooseContainer = document.createElement("div");
	viewChooseContainer.className = "viewChoose";
	mainElement.appendChild(viewChooseContainer);
	
    viewChooseContainer.appendChild(createButton( elementCommon ));
    viewChooseContainer.appendChild(createButton( elementSimple ));
	
	mainElement.addEventListener("click", viewChooseHandler);
	
	function viewChooseHandler (event) {
		
		var clickedElement = event.target;
		
		if (clickedElement.classList.contains('viewChooseButton')) {
			switch(clickedElement.innerHTML) {
				case "ОБЫЧНЫЙ":
					var changedElements = document.querySelectorAll('.simple');
					if(changedElements.length > 0){
						for(var i = 0; i < changedElements.length; i++) {
							changedElements[i].classList.remove("simple");
						};
					};
					break;
				case "ПОПРОЩЕ":
					var changedElements = document.querySelectorAll('.simple');
					if(changedElements.length == 0){
						mainElement.classList.add("simple");
						var toChangeElements = document.querySelectorAll('.memory');
						for(i = 0; i < toChangeElements.length; i++) {
							toChangeElements[i].classList.add("simple");
						};
						toChangeElements = document.querySelectorAll('.unarOperation');
						for(i = 0; i < toChangeElements.length; i++) {
							toChangeElements[i].classList.add("simple");
						};						
					};					
					break;
			};		
		};
		
	    mainElement.removeEventListener("click", viewChooseHandler);		
		mainElement.removeChild(viewChooseContainer);
	};
	
};
/* ----------------------------------------------------------------------------------------*/
/* ---	ФУНКЦИЯ СОЗДАНИЯ КАЛЬКУЛЯТОРА  ----------------------------------------------------*/
function madeCalculator () {
	var calculator = new Calculator();
};

