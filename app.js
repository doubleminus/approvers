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
                    //GET /api/v2/search.json?query="type:organization name:<organization name>"
                    url: '/api/v2/search.json?query=type%3Aorganization%20name%3A' + org_name,
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

            var approvalStatus = this.ticket().customField("custom_field_23909086");
            //console.log('Ticket approval status is ' + approvalStatus);

            requesterId = this.ticket().requester().id();
            //console.log('Requester ID is ' + requesterId);
            //console.log('this.currentUser(): ' + this.currentUser().id());

            // Cannot resubmit for approval if already approved
            if (approvalStatus == "approved") {
                this.switchTo('approved');
            }
            // Give user option to submit ticket for approval
            else {
                var approvalDept = this.ticket().customField("custom_field_23894827");
                console.log("Approval department (organization): " + approvalDept);

                var request = this.ajax('fetchApprovalOrgs', approvalDept);

                // Only allow ticket requester to submit ticket for approval
                if (requesterId == this.currentUser().id()) {
                    request.done(this.showApprovers);
                }
                else {
                    request.done(this.showApproversNotRequester);
                }

                request.fail(this.showError);
            }
        },

        showApprovers: function(data) {
            this.switchTo('submit', data);
        },

        showApproversNotRequester: function(data) {
            this.switchTo('not_requester', data);
        },

        showError: function() {
            this.switchTo('error');
        },
      };
}());