/***********************************************************
 * Screen constructor
 * Params:
 * 	- round: The round duration
 * 	- rest: The rest duration
 * 	- intro: The intro duration
 * 	- numRounds: The number of workout rounds
 **********************************************************/
function SecondAssistant( round, rest, intro, numRounds ) {
	this.model = { 
		roundTime: round
		, restTime: rest
		, introTime: intro
		, numRounds: numRounds
		, current: intro 
		, currentRound : numRounds
	};
	this.countInterval; // Interval for counter
}

/*********************************************
 * Initial screen and widget setup
 *********************************************/
SecondAssistant.prototype.setup = function() {
	/* setup widgets here */
	// this.controller.setupWidget( "btnStart", {}, { disabled: false } );
	Mojo.Event.listen( this.controller.get( "btnStart" ), Mojo.Event.tap, this.handleStart.bind( this ) );

	// this.controller.setupWidget( "btnBack", {}, { disabled: false } );
	Mojo.Event.listen( this.controller.get( "btnBack" ), Mojo.Event.tap, this.handleBack.bind( this ) );

	// Initial time setup
	this.doDisplay( this.model.introTime );
};

SecondAssistant.prototype.timer = function( ) {
	
	this.model.current--;
	this.doDisplay( this.model.current );
	if( this.model.current === 0 )
	{
		window.clearInterval( this.countInterval );
		return;
	}
	
};

/***********************************************
 * Handle the intro time countdown.
************************************************/
SecondAssistant.prototype.doIntro = function() {
	Mojo.Log.info( "Beastmaker ======= Starting intro countdown" );

	this.currentInterval = window.setInterval(
		( function( self ) { return function() {
			self.doDisplay( self.model.current );
			self.model.current--;

			if( self.model.current <= 0 )
			{
				window.clearInterval( self.currentInterval );
				// Start rounds:
				self.doRound();
			}
		}; } ) ( this )
		, 1000
	);
};

/***********************************************
 * Handles an individual round countdown
 ***********************************************/
SecondAssistant.prototype.doRound = function() {
	if( this.model.currentRound === 0 )
	{
		this.doDisplay( "Round complete!" );
		return;
	}

	this.model.current = this.model.roundTime;
	Mojo.Log.info( "Beastmaker ======= Doing round " + this.model.currentRound + "( " + this.model.current + " seconds )" );
	this.currentInterval = window.setInterval(
		( function( self ) { return function() {
			var body = Element.select( self.controller.document, "body" );
			body[ 0 ].style.backgroundColor = "#66ff00";

			self.doDisplay( self.model.current );
			self.model.current--;

			if( self.model.current <= 0 )
			{
				if( self.model.currentRound > 0 )
				{
					// Set to rest
					self.model.currentRound--;
					window.clearInterval( self.currentInterval );
					self.model.current = self.model.restTime;
					setTimeout( self.doRest(), 1000 );
				}
			}
		}; } ) ( this )
		, 1000
	);
};

/**********************************************
 * Handles a rest period countdown
 **********************************************/
SecondAssistant.prototype.doRest = function() {
	Mojo.Log.info( "Beastmaker ======= Starting rest ( " + this.model.current + " seconds )" );
	this.currentInterval = window.setInterval(
			( function( self ) { return function() {
				self.doDisplay( self.model.current );

				// self.controller.get( "timer" ).style.backgroundColor = "#ff0000";
				var body = Element.select( self.controller.document, "body" );
				body[ 0 ].style.backgroundColor = "#ff0000";

				self.model.current--;

				if( self.model.current === 0 )
				{
					// Set to round
					window.clearInterval( self.currentInterval );
					self.model.current = self.model.round;
					setTimeout( self.doRound(), 1000 );
				}
			}; } ) ( this )
		, 1000 
	);
};

SecondAssistant.prototype.handleStart = function( event ) {
	this.model.current = this.model.introTime;
	if( this.model.introTime !== 0 )
		this.doIntro();
	else
		this.doRound();
};

SecondAssistant.prototype.handleBack = function( event ) {
	if( this.currentInterval !== null )
		window.clearInterval( this.currentInterval );

	Mojo.Controller.stageController.pushScene( "first" );

};

SecondAssistant.prototype.doDisplay = function( currentValue ) {
	var text;

	if( isNaN( currentValue ) ) {
		text = currentValue;
	} else {
		if( currentValue < 10 )
			text = ":0" + currentValue;
		else
		text = ":" + currentValue;
	}
	this.controller.get( "timer" ).update( text );

};

SecondAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

SecondAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

SecondAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
