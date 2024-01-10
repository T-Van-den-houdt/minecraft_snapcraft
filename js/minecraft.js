    //data for testing 
    /*const data1 = {
        time: new Date(),
        online: 300,
        max: 1720
    }

    const data2 = {
        time: new Date(),
        online: 350,
        max: 1720
    }

    const data3 = {
        time: new Date(),
        online: 400,
        max: 1720
    }*/
    
    let players = [/*data1, data3, data2*/];

    //data fetcher
    const fetchData = async () => {
        const response = await fetch ("https://api.mcsrvstat.us/3/snapcraft.net");
        const data = await response.json();
        const newData = {
            time: new Date(),
            online: data.players.online,
            max: data.players.max
        }
        players.unshift(newData)
    };

    //control output functions
    const readNumberOfLines = () => {
        limiterSelected = document.querySelector('input[name="numberOfLines"]:checked');
        return limiterSelected.value
    };

    const sortByOnlineChecked = () => {
        return document.getElementById("value").checked
    };

    const sortByOldestDateChecked = () => {
        return document.getElementById("time-oldest").checked
    }

    const sortByFirsttDateChecked = () => {
        return document.getElementById("time-first").checked
    }

    //start tablerow functions
    const makeDateTableRow = (data) => {
        const tableDataDate = document.createElement("td");
        tableDataDate.innerHTML = data.time.getDate() + '/' + data.time.getMonth() + 1 + '/' + data.time.getFullYear();
        return tableDataDate; 
    };

    const makeTimeTableRow = (data) => {
        const tableDataTime = document.createElement("td");
        minuteCount = data.time.getMinutes();
        if (minuteCount < 10) {
        tableDataTime.innerHTML = data.time.getHours() + ":" + "0" + data.time.getMinutes(); }
        else {
            tableDataTime.innerHTML = data.time.getHours() + ":" + data.time.getMinutes();
        }
        return tableDataTime; 
    };

    const makeOnlineTableRow = (data) => {
        const tableDataOnline = document.createElement("td");
        tableDataOnline.innerHTML = data.online;
        return tableDataOnline;
    };

    const makeMaxTableRow = (data) => {
        const tableDataMax = document.createElement("td");
        tableDataMax.innerHTML = data.max;
        return tableDataMax;
    };

    const makeAllTableRows = (players) => {
        const tableBody = document.getElementById("minecraftTable");
        let numberOfLines = readNumberOfLines();
        let sortByOnline = sortByOnlineChecked();
        let oldTime = sortByOldestDateChecked();
        let newTime = sortByFirsttDateChecked();

        //clear table
        tableBody.replaceChildren();

        //filter data
        for (players.length; players.length > numberOfLines;)  {
            players.pop();   
        };

        if (sortByOnline == true) {
            dataToRender = players.toSorted((a,b) => b.online > a.online);
        } else {
            dataToRender = players;
        };

        if (oldTime == true) {
            dataToRender = dataToRender.toSorted((a,b) => a.time > b.time);
        } else {
            dataToRender = dataToRender.toSorted((a, b) => b.time > a.time);
        };

        //generate rows
        dataToRender.forEach((playerData) => {
            const tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);

            const dateTableRow = makeDateTableRow(playerData);
            tableRow.appendChild(dateTableRow);

            const timeTableRow = makeTimeTableRow(playerData);
            tableRow.appendChild(timeTableRow);

            const onlineTableRow = makeOnlineTableRow(playerData);
            tableRow.appendChild(onlineTableRow);

            const maxTableRown = makeMaxTableRow(playerData);
            tableRow.appendChild(maxTableRown); 
        });
    }

    //output functions
    const renderData = (players) => {
        makeAllTableRows(players);  
    };

    const fetchAndRenderGames = async () => {
        await fetchData();
        renderData(players);
    }

    setInterval(fetchAndRenderGames, 5000);