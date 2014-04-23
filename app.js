(function() {
  var approverArr;

  return {
    events: {
      'app.activated':'getInfo'
    },

    requests: {
      fetchApprovers: function(id) {
        return {
          //GET /api/v2/users/{id}.json
          url: '/api/v2/users/' + id + '.json',
          type:'GET',
          dataType: 'json'
        };
      }
    },

    // Display a "Submit for approval" dialogue w/potential approvers
    submitTicket: function() {
      this.switchTo('submit');
    },

    // Get ticket's current approval status, Id of ticket requester, and approvers
    getInfo: function() {
      var approvalStatus = this.ticket().customField("custom_field_23909086");
      //console.log('Ticket approval status is ' + approvalStatus);

      var id = this.ticket().requester().id();
      //console.log('Requester ID is ' + id);

      var request = this.ajax('fetchApprovers', id);
      request.done(this.showApprovers);
      request.fail(this.showError);
    },

    showApprovers: function(data) {
      var approverString = data.user.user_fields.approvers;
      this.approverArr = new Array(approverString.split(';'));

      this.switchTo('submit', data);
    },

    showError: function() {
      this.switchTo('error');
    },
  };

}());