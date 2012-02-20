function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FirstAssistant.prototype.setup = function() {
	
	/* setup widgets here */
	this.seconds = [ 
			{ label: "1 second", value: "1" }
			, { label: "2 seconds", value: "2" }
			, { label: "3 seconds", value: "3" }
			, { label: "4 seconds", value: "4" }
			, { label: "5 seconds", value: "5" }
			, { label: "6 seconds", value: "6" }
			, { label: "7 seconds", value: "7" }
			, { label: "8 seconds", value: "8" }
			, { label: "9 seconds", value: "9" }
			, { label: "10 seconds", value: "10" }
		];
	this.rounds = [ 
			{ label: "1", value: 1 }
			, { label: "2", value: 2 }
			, { label: "3", value: 3 }
			, { label: "4", value: 4 }
			, { label: "5", value: 5 }
			, { label: "6", value: 6 }
			, { label: "7", value: 7 }
			, { label: "8", value: 8 }
			, { label: "9", value: 9 }
			, { label: "10", value: 10 }
		];
	// Attributes
	this.roundSelectAttrs = { label: $L( "Round Time" ), "disabled": false, choices: this.seconds, modelProperty: "currentValue" };
	this.restSelectAttrs = { label: $L( "Rest Time" ), "disabled": false, choices: this.seconds, modelProperty: "currentValue" };
	this.introSelectAttrs = {label: $L( "Intro Time" ), "disabld": false, choices: this.seconds, modelProperty: "currentValue" };
	this.iterSelectAttrs = { label: $L( "Total Rounds" ), "disabled" : false, choices: this.rounds, modelProperty: "currentValue" };
	this.btnAttrs = {};

	// Models
	this.roundSelectModel = {  currentValue: "0" };
	this.restSelectModel = { currentValue: "0" };
	this.introSelectModel = { currentValue: "0" };
	this.iterSelectModel = { currentValue: 0 };
	this.btnModel = { "label": "Go", "disabled": false };

	this.controller.setupWidget( "btnSubmit", this.btnAttrs, this.btnModel );
	this.controller.setupWidget( "roundSelect", this.roundSelectAttrs, this.roundSelectModel );
	this.controller.setupWidget( "restSelect", this.restSelectAttrs, this.restSelectModel );
	this.controller.setupWidget( "introSelect", this.introSelectAttrs, this.introSelectModel );
	this.controller.setupWidget( "iterSelect", this.iterSelectAttrs, this.iterSelectModel );

	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen( this.controller.get( "btnSubmit" ), Mojo.Event.tap, this.handleSubmit.bind( this ) );
	Mojo.Event.listen( this.controller.get( "roundSelect" ), Mojo.Event.propertyChange, this.roundChanged.bindAsEventListener( this ) );
	Mojo.Event.listen( this.controller.get( "restSelect" ), Mojo.Event.propertyChange, this.restChanged.bindAsEventListener( this ) );
	Mojo.Event.listen( this.controller.get( "introSelect" ), Mojo.Event.propertyChange, this.introChanged.bindAsEventListener( this ) );

};

// Events
FirstAssistant.prototype.roundChanged = function( event ) {
};


FirstAssistant.prototype.restChanged = function( event ) {
};


FirstAssistant.prototype.introChanged = function( event ) {
};


FirstAssistant.prototype.handleSubmit = function( event ) {
	// Move along...
	Mojo.Controller.stageController.pushScene( "second"
			, this.roundSelectModel.currentValue
			, this.restSelectModel.currentValue
			, this.introSelectModel.currentValue 
			, this.iterSelectModel.currentValue
	);
};

FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
