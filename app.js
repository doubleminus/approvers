(function() {

  return {
    events: {
      'app.activated':'showApprovers'
    },

    showApprovers: function() {
      this.switchTo('approvers');
    }
  };

}());