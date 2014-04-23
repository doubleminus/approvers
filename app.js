(function() {

  return {
    events: {
      'app.activated':'submitTicket'
    },

    // Get the Id of our ticket requester
    getRequesterId: function() {
      var id = this.ticket().requester().id();
      //console.log('Requester ID is ' + id);
    },

    // Display a "Submit for approval" dialogue w/potential approvers
    submitTicket: function() {
      this.switchTo('submit');
    },

    // Display a list of current user's approvers and approval progress
    showApprovers: function() {
      this.switchTo('approvers');
    }
  };

}());