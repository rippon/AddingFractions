var myCanvas;
var context;
var myCanvasWidth;
var myCanvasHeight;
var numberOfWholes;
var centre;
var radius_of_OneWhole;
var fraction1, fraction2;
var equivFrac1, equivFrac2;
var numberOf_canvasRows;
var numberOf_canvasColumns;
var myCanvas_xMarks = []; // ruler marks for the myCanvas
var myCanvas_yMarks = []; // ruler marks for the myCanvas
var myCanvas_xMarks_interval;
var myCanvas_yMarks_interval;
var myCanvasColumns = [];
var myCanvasRows = [];
var myCanvasSections = [];
var myFontSize;
var inputVerified = false;
var checkInputButtonClicked = false;
var fraction1NumeratorSet;
var fraction1DenominatorSet;
var fraction2NumeratorSet;
var fraction2DenominatorSet;


function CanvasRow(index){
    this.i = index;
    this.y = this.i * myCanvasHeight/numberOf_canvasRows;
}
function CanvasColumn(index){
    this.j = index;
    this.x = this.j * myCanvasWidth/numberOf_canvasColumns;
}
function CanvasSection(row, column){
    this.x = column.x;
    this.y = row.y;
}

function initialise_schoolMaths(){
    myCanvas = this.document.getElementById("myCanvas");
    context = myCanvas.getContext("2d");
    myCanvasWidth = myCanvas.getAttribute("width");
    myCanvasHeight = myCanvas.getAttribute("height");
    numberOf_canvasRows = 8;
    numberOf_canvasColumns = 8;
    myCanvas_xMarks_interval = myCanvasWidth / numberOf_canvasColumns;
    myCanvas_yMarks_interval = myCanvasHeight / numberOf_canvasRows;
    for (i=0; i < numberOf_canvasRows; i++){
        myCanvasRows.push(new CanvasRow(i));
        myCanvas_yMarks.push(i * myCanvas_yMarks_interval);
    }
    for (j=0; j < numberOf_canvasColumns; j++){
        myCanvasColumns.push(new CanvasColumn(j));
        myCanvas_xMarks.push(j * myCanvas_xMarks_interval);
    }
    for (i=0; i < numberOf_canvasRows; i++){
        for (j=0; j < numberOf_canvasColumns; j++){
            myCanvasSections.push(new CanvasSection(myCanvasRows[i],myCanvasColumns[j]));
        }
    }
    radius_of_OneWhole = myCanvasWidth/16;
    if (!checkInputButtonClicked){
        fraction1 = new Fraction(2, 3);
        fraction2 = new Fraction(4, 5);
        checkInputButtonClicked = false;
    }
    clearMyCanvas();
    fraction1NumeratorSet = false;
    fraction1DenominatorSet = false;
    fraction2NumeratorSet = false;
    fraction2DenominatorSet = false;
}

function add(){
    if (!(fraction1NumeratorSet && fraction1DenominatorSet &&
          fraction2NumeratorSet && fraction2DenominatorSet)) {
        alert("You must set the fractions first.");
        return;
    }
    if (!checkInputButtonClicked){
//        document.getElementById("messageArea1").innerHTML = "You must check the input first.";
        alert("You must check the input first.");
        return;
    }
    document.getElementById("messageArea1").innerHTML = "add() called";
    var m=2, n=5;
    document.getElementById("messageArea2").innerHTML =
       "LCM(" + m + ", " + n + ") = " + LCM([m,n]);
    context.stroke();
    if (inputOkay()){
        {
            function labelFraction(f, x, y, w, h){ // give a textual label to a pictorial fraction
                this.fraction = f;
                function fractionLabelRectangle(){ // the (notional) rectangle in which the fraction label is contained
                    this.x = x;
                    this.y = y;
                    this.width = w;
                    this.height = h;
                    this.x = this.x - this.width/3; // correction needed to improve alignment
                }
                myFractionLabelRectangle = new fractionLabelRectangle();
                myFontSize = myFractionLabelRectangle.height/4;
                context.font = myFontSize + "px Arial";
                // now draw a box around the fraction label, just for visually testing alignment
                // - comment out when happy with alignment
                /*************************
                context.rect(myFractionLabelRectangle.x, myFractionLabelRectangle.y,
                             myFractionLabelRectangle.width, myFractionLabelRectangle.height);
                context.stroke();
                ******************/
                // First draw the fraction numerator
                context.fillText(f.numerator, myFractionLabelRectangle.x + (1/5)*myFractionLabelRectangle.width,
                                 myFractionLabelRectangle.y + (2/5)*myFractionLabelRectangle.height);
                // Now draw the dividing line of the fraction
                moveToPoint(new xyPoint(myFractionLabelRectangle.x + (0.8/5)*myFractionLabelRectangle.width,
                                        myFractionLabelRectangle.y + (2.5/5)*myFractionLabelRectangle.height));
                lineToPoint(new xyPoint(myFractionLabelRectangle.x + (3.3/5)*myFractionLabelRectangle.width,
                                        myFractionLabelRectangle.y + (2.5/5)*myFractionLabelRectangle.height));
                // Now draw the denominator
                context.fillText(f.denominator, myFractionLabelRectangle.x + (1/5)*myFractionLabelRectangle.width,
                                      myFractionLabelRectangle.y + (4/5)*myFractionLabelRectangle.height);
            }
            function mathSymbol(symbol, x, y){
                myFontSize = myCanvas_xMarks_interval/2;
                context.font = myFontSize + "px Arial";
                context.fillText(symbol, x, y);
            }
            var myLCM = LCM([fraction1.denominator, fraction2.denominator]);
            equivFrac1 = new Fraction((myLCM/fraction1.denominator)*fraction1.numerator, myLCM);
            equivFrac2 = new Fraction((myLCM/fraction2.denominator)*fraction2.numerator, myLCM);
            var fractionSum = new Fraction (equivFrac1.numerator + equivFrac2.numerator, myLCM);
            var fraction1Picture =
              new FractionPicture(new xyPoint(myCanvas_xMarks[2], myCanvas_yMarks[0] + myCanvas_yMarks_interval/2),
                                  fraction1, "green");
            labelFraction(fraction1, myCanvas_xMarks[2], myCanvas_yMarks[1],
                          radius_of_OneWhole, 2*radius_of_OneWhole);
            mathSymbol("+", myCanvas_xMarks[3], myCanvas_yMarks[0] + myCanvas_yMarks_interval/2);
            var fraction2Picture =
              new FractionPicture(new xyPoint(myCanvas_xMarks[4], myCanvas_yMarks[0] + myCanvas_yMarks_interval/2),
                                  fraction2, "blue");
            labelFraction(fraction2, myCanvas_xMarks[4], myCanvas_yMarks[1],
                          radius_of_OneWhole, 2*radius_of_OneWhole);
            mathSymbol("=", myCanvas_xMarks[1], myCanvas_yMarks[2] + myCanvas_yMarks_interval/2);
            var equivFraction1Picture =
              new FractionPicture(new xyPoint(myCanvas_xMarks[2], myCanvas_yMarks[2] + myCanvas_yMarks_interval/2),
                                  equivFrac1, "green");
            labelFraction(equivFrac1, myCanvas_xMarks[2], myCanvas_yMarks[3],
                          radius_of_OneWhole, 2*radius_of_OneWhole);
            mathSymbol("+", myCanvas_xMarks[3], myCanvas_yMarks[2] + myCanvas_yMarks_interval/2);
            var equivFraction2Picture =
              new FractionPicture(new xyPoint(myCanvas_xMarks[4], myCanvas_yMarks[2] + myCanvas_yMarks_interval/2),
                                  equivFrac2, "blue");
            labelFraction(equivFrac2, myCanvas_xMarks[4], myCanvas_yMarks[3],
                          radius_of_OneWhole, 2*radius_of_OneWhole);
            if ((fraction1.numerator/fraction1.denominator + fraction2.numerator/fraction2.denominator) <= 1){
                // i.e. if the sum gives a proper fraction or 1 whole
                mathSymbol("=", myCanvas_xMarks[1], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2);
                var fractionSum_compositePicture =
                  new FractionSumPicture(new xyPoint(myCanvas_xMarks[2], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2),
                                         myLCM, equivFrac1.numerator, "green", equivFrac2.numerator, "blue");
                labelFraction(fractionSum_compositePicture.fraction, myCanvas_xMarks[2], myCanvas_yMarks[5],
                              radius_of_OneWhole, 2*radius_of_OneWhole);
                mathSymbol("=", myCanvas_xMarks[3], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2);
                var fractionSum_Picture =
                  new FractionPicture(new xyPoint(myCanvas_xMarks[4], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2),
                                      fractionSum, "red");
                labelFraction(fractionSum_Picture.fraction, myCanvas_xMarks[4], myCanvas_yMarks[5],
                              radius_of_OneWhole, 2*radius_of_OneWhole);
            }
            if ((fraction1.numerator/fraction1.denominator + fraction2.numerator/fraction2.denominator) > 1){
                // i.e. if the sum gives an improper fraction
                mathSymbol("=", myCanvas_xMarks[1], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2);
                var fractionSum_compositePicture_WholePart =
                  new FractionSumPicture(new xyPoint(myCanvas_xMarks[2], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2),
                                         myLCM, equivFrac1.numerator, "green", myLCM - equivFrac1.numerator, "blue");
                labelFraction(fractionSum_compositePicture_WholePart.fraction,
                              myCanvas_xMarks[2], myCanvas_yMarks[5],
                              radius_of_OneWhole, 2*radius_of_OneWhole);
                var fractionSum_compositePicture_overflow =
                  new FractionPicture(new xyPoint(myCanvas_xMarks[4], myCanvas_yMarks[4] + myCanvas_yMarks_interval/2),
                                      new Fraction(equivFrac2.numerator - (myLCM - equivFrac1.numerator), myLCM), "blue");
                labelFraction(fractionSum_compositePicture_overflow.fraction,
                              myCanvas_xMarks[4], myCanvas_yMarks[5],
                              radius_of_OneWhole, 2*radius_of_OneWhole);
                mathSymbol("=", myCanvas_xMarks[1], myCanvas_yMarks[6] + myCanvas_yMarks_interval/2);
                var fractionSum_Picture =
                  new FractionSumPicture(new xyPoint(myCanvas_xMarks[2], myCanvas_yMarks[6] + myCanvas_yMarks_interval/2),
                                         myLCM, equivFrac1.numerator, "red", myLCM - equivFrac1.numerator, "red");
                labelFraction(fractionSum_Picture.fraction,
                              myCanvas_xMarks[2], myCanvas_yMarks[7],
                              radius_of_OneWhole, 2*radius_of_OneWhole);
                var fractionSum_Picture_overflow =
                  new FractionPicture(new xyPoint(myCanvas_xMarks[4], myCanvas_yMarks[6] + myCanvas_yMarks_interval/2),
                                      new Fraction(equivFrac2.numerator - (myLCM - equivFrac1.numerator), myLCM), "red");
                labelFraction(fractionSum_Picture_overflow.fraction,
                              myCanvas_xMarks[4], myCanvas_yMarks[7],
                              radius_of_OneWhole, 2*radius_of_OneWhole);
            }
        }
    }
    checkInputButtonClicked = false;
}

function FractionSumPicture(centre, LCM, numerator1, colour1, numerator2, colour2){
    this.fraction = new Fraction((numerator1+numerator2), LCM);
    this.whole = new Whole(centre, LCM);
    this.draw = function(){
        var sectorAngle1 = (numerator1/LCM)*(2*Math.PI); 
        var sectorAngle2 = (numerator2/LCM)*(2*Math.PI); 
        context.beginPath();
        moveToPoint(centre);
        var firstCircumferencePoint = new xyPoint(centre.x + radius_of_OneWhole, centre.y);
        lineToPoint(firstCircumferencePoint);
        context.arc(centre.x, centre.y, radius_of_OneWhole, 0*Math.PI, sectorAngle1, false);
        lineToPoint(centre);
        context.fillStyle = colour1;
        context.fill();
        context.closePath();
        context.beginPath();
        moveToPoint(centre);
        var secondCircumferencePoint = new xyPoint(centre.x + radius_of_OneWhole*Math.cos(sectorAngle1),
                                                   centre.y + radius_of_OneWhole*Math.sin(sectorAngle1));
        lineToPoint(secondCircumferencePoint);
        context.arc(centre.x, centre.y, radius_of_OneWhole, sectorAngle1, sectorAngle1 + sectorAngle2, false                                                                                                                                                                                                                                                      );
        lineToPoint(centre);
        context.fillStyle = colour2;
        context.fill();
        context.closePath();
        this.whole.draw();
    };
    this.draw();
}

function FractionPicture(centre, fraction, colour){
    this.fraction = fraction;
    this.whole = new Whole(centre, fraction.denominator);
    this.draw = function(){
        var sectorAngle = (fraction.numerator/fraction.denominator) * (2*Math.PI); 
        context.beginPath();
        moveToPoint(centre);
        lineToPoint(new xyPoint(centre.x + radius_of_OneWhole, centre.y));
        context.arc(centre.x, centre.y, radius_of_OneWhole, 0*Math.PI, sectorAngle, false);
        lineToPoint(centre);
        context.fillStyle = colour;
        context.fill();
        context.closePath();
        this.whole.draw();
    };
    this.draw();
}

function Whole(centre, denominator){
    this.draw = function(){
        context.beginPath();
        context.arc(centre.x, centre.y, radius_of_OneWhole, 0*Math.PI, 2*Math.PI, false); 
        context.closePath();
        context.stroke();
        blob(centre, radius_of_OneWhole/20, "black"); // draw blob at centre
        for (i=0; i < denominator; i++){
            moveToPoint(centre);
            var circumferencePoint = new xyPoint(centre.x + radius_of_OneWhole*Math.cos(i*(2*Math.PI/denominator)),
                                                 centre.y + radius_of_OneWhole*Math.sin(i*(2*Math.PI/denominator)));
            lineToPoint(circumferencePoint);
        }
    };
}

function inputOkay(){
    checkInputButtonClicked = true;
    clearMyCanvas();
    document.getElementById("messageArea1").innerHTML =
      "fraction 1 numerator = " + fraction1.numerator;
    document.getElementById("messageArea3").innerHTML =
      "fraction 1 denominator = " + fraction1.denominator;
    document.getElementById("messageArea2").innerHTML =
      "fraction 2 numerator = " + fraction2.numerator;
    document.getElementById("messageArea4").innerHTML =
      "fraction 2 denominator = " + fraction2.denominator;
    if ((fraction1.numerator < fraction1.denominator) &&
        (fraction2.numerator < fraction2.denominator)) {
        document.getElementById("messageArea5").innerHTML =
          "fractions are proper";
        return true;
    } else {
             document.getElementById("messageArea5").innerHTML =
               "at least one fraction is improper";
            return false;
      }
}

function setFraction1numerator(toThis){
    fraction1.numerator = toThis;
    fraction1NumeratorSet = true;
}
function setFraction1denominator(toThis){
    fraction1.denominator = toThis;
    fraction1DenominatorSet = true;
}
function setFraction2numerator(toThis){
    fraction2.numerator = toThis;
    fraction2NumeratorSet = true;
}
function setFraction2denominator(toThis){
    fraction2.denominator = toThis;
    fraction2DenominatorSet = true;
}

