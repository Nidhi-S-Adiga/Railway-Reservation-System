var sel_seats=[];
var seatPrice = 700;
var amt;
var reserve = {
    // (A) INIT
    init : () => {
      // (A1) GET LAYOUT WRAPPER
      let layout = document.getElementById("layout");

      function isSaved(seatId) {
        return fetch("seats.txt")
          .then(response => response.text())
          .then(text => {
            // Check if seatId is present in the file
            return text.indexOf(seatId) !== -1;
          })
          .catch(error => {
            console.error("Error fetching seats:", error);
            return false;
          });
      }
   
      // (A2) GENERATE SEATS
      for (let i=65; i<=68; i++) { for (let j=1; j<=10; j++) {
        let seat = document.createElement("div");
        seat.innerHTML = String.fromCharCode(i) + j;
        seat.className = "seat";
        seat.onclick = () => { reserve.toggle(seat); };
          // Check if seat is saved and add class accordingly
          isSaved(String.fromCharCode(i) + j)
    .then(saved => {
      if (saved) {
        seat.classList.add("saved");
        seat.onclick = null; // Disable clicking on saved seats
      }
    });
        layout.appendChild(seat);
      }}
      
      // (A3) FOR DEMO ONLY - RANDOM TAKEN SEATS
      let all = document.querySelectorAll("#layout .seat"),
          len = all.length - 1, rnd = [];
      //while (rnd.length != 3) {
       // let r = Math.floor(Math.random() * len);
      // if (!rnd.includes(r)) { rnd.push(r); }
    // }
      //for (let i of rnd) {
       // all[i].classList.add("taken");
      //  all[i].onclick = "";
     // }
    },
   
// (B) CHOOSE THIS SEAT
toggle : (seat) => {
  if (seat.classList.contains("saved")) {
    // Seat is already saved, do nothing
    return;
  }
  
  seat.classList.toggle("selected");
    },
   
    // (C) SAVE RESERVATION
    save : () => {
      // (C1) GET SELECTED SEATS
      let selected = document.querySelectorAll("#layout .selected");
   
      // (C2) ERROR!
      if (selected.length == 0) { alert("No seats selected."); }
   
      // (C3) SELECTED SEATS
      else {
        // (C3-1) GET SELECTED SEAT NUMBERS
        let seats = [];
        for (let s of selected) { seats.push(s.innerHTML);       
         s.classList.add("taken");
         s.onclick = ""; }
         sel_seats=seats;
             // Calculate ticket amount
    let ticketAmount = seats.length * seatPrice;
    amt=ticketAmount;
         // (C3-2) DO SOMETHING WITH IT...
      let data = new FormData();
      data.append("seats", JSON.stringify(seats));
      data.append("name", document.querySelector("#name").value);
      data.append("email",document.querySelector("#emaiil").value);
      data.append("age",document.querySelector("#age").value);
      data.append("gender",document.querySelector("#train-selection").value);
      data.append("phone-number",document.querySelector("#phone").value);
      data.append("date",document.querySelector("#start-date").value);
      data.append("source","Bangalore");
      data.append("destination","Rishikesh");
      data.append("train","Enigma Express");
      data.append("amount", seatPrice);
      data.append("time",document.querySelector("#time-selection").value);
      fetch("first.php", {
        method: "POST",
        body : data
      })
      .then(res => res.text())
      .then(txt => console.log(txt));
    }
  }
};
   
  window.addEventListener("DOMContentLoaded", reserve.init);

  

  function printTicket() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("emaiil").value;
    var date = document.getElementById("start-date").value;
    var source = "Bangalore";
    var train="Enigma Express";
    var num = document.getElementById("phone").value;
    var destination = "Rishikesh";
    var time = document.getElementById("time-selection").value;
    var seats = sel_seats;
    var amts=amt;
    
  
    var ticketHTML = `
      <div id="ticket" style="border: 2px solid black; padding: 20px;">
        <h2>Enigma Express</h2>
        <h3>Ticket Information</h3>
        <p><strong>Name: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Contact Number: </strong> ${num}</p>
        <p><strong>Train: </strong> ${train}</p>
        <p><strong>Source: </strong> ${source}</p>
        <p><strong>Destination: </strong> ${destination}</p>
        <p><strong>Date: </strong> ${date}</p>
        <p><strong>Time: </strong> ${time}</p>
        <p><strong>Seats: </strong> ${seats}</p>
        <p><strong>Total Amount: Rs </strong> ${amts}</p>
      </div>
    `;
  
    var printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write(ticketHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    console.log("dhgf");
  }