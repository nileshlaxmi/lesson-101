checkTrainBotStatus = (botId) => {
    // xhttp.onreadystatechange = function () {
    //   if (this.readyState == 4 && this.status == 200) {
    //     debugger
    //     console.log("this.response", JSON.parse(this.response));
    //     res = JSON.parse(xhttp.responseText);
    //     if (res.result.train_state === "completed") {
    //       that.setState({ isTrainingCompleted: true });
    //     }
    //     else {
    //       that.setState({ isTrainingCompleted: false });
    //       // return res.result.train_state;
    //     }
    //   }
    // };
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPoint.botTrainStatus(botId), false);
    xhttp.send();
    return JSON.parse(xhttp.responseText);


  }