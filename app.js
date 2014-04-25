(function() {

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
      },

      fetchApprovalOrgs: function(org_name) {
        return {
          //GET /api/v2/search.json?query="type:user organization:Approval Org"
          url: '/api/v2/search.json?query=type%3Auser%20organization%3A' + org_name,
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
      var orgName;
      //var approvalStatus = this.ticket().customField("custom_field_23909086");
      //console.log('Ticket approval status is ' + approvalStatus);

      var id = this.ticket().requester().id();
      //console.log('Requester ID is ' + id);

      var ticket = this.ticket();
      var tagArray = ticket.tags();

      console.log("tagArray: " + tagArray);

      for (var i=0; i<tagArray.length; i++) {
        if (tagArray[i].length >= 4 && tagArray[i].substr(0,3) == 'ao_') {
            orgName  = tagArray[i].slice(4, tagArray[i].length);
        }
      }

      orgName = 'approvalorg';

      console.log("ORG NAME: " + orgName);

      var request = this.ajax('fetchApprovalOrgs', orgName);
      request.done(this.showApprovers);
      request.fail(this.showError);
    },

    showApprovers: function(data) {
      //var approverString = data.user.user_fields.approvers;
      //this.approverArr = new Array(approverString.split(';'));

      this.switchTo('submit', data);
    },

    showError: function() {
      this.switchTo('error');
    },
  };

}());