var roomApi = "http://localhost:3000/rooms";
// gọi danh sách room từ file json
function getRooms(callback) {
  fetch(roomApi)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => {
      console.log("Đã xảy ra lỗi khi tải dữ liệu:", error);
    });
}
// handle tạo room
function createRoom(data, callback) {
  var options = {
    method: "POST", // method tạo mới dữ liệu
    headers: {
      "Content-Type": "application/json",
      "User-agent": "Iot Pannel",
    },
    body: JSON.stringify(data),
  };
  fetch(roomApi, options)
    .then((res) => res.json())
    .then(callback);
}
// delete room với param id của room
function handleDeleteRoom(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(roomApi + "/" + id, options)
    .then((res) => res.json())
    .then(function () {
      getRooms(renderRooms);
    });
}
//##############################################################################
// function main get data

function start() {
  getRooms(renderRooms);
  handleAddRoom();
}

start();
//##############################################################################
// Show list  room
function renderRooms(rooms) {
  var listRooms = document.querySelector("#card__iot");
  const nonRoom = [
    `
  <div class="card " style="width: 18rem; margin-left:15px; margin-right:15px">
  <div class="card-body" style=" text-align: center;">
    <h5 class="card-title">Không có thiết bị</h5>
  </div>
  </div>
  </div> 
  
  `,
  ];
  const htmls = rooms.map((room) => {
    return `
    <div class="card card-item-${room.id}" style="width: 18rem; margin-left:15px; margin-right:15px; margin-bottom:15px">
    <img src="${room.image}" class="card-img-top" height="290px" width="223px"  >
    <div class="card-body" style="text-align: center;">
      <h5 class="card-title">${room.name}</h5>
      <button  onclick="handleDeleteRoom(${room.id})" style="float: left;"  class="btn btn-danger btn-delete">Xóa</button>
      <a class="btn btn-primary" href="rooms.html?room=${room.id}" style="float: right;">Điều Khiển</a>
    </div>
  </div>
    
    `;
  });
  if (rooms.length == 0) {
    // không có room
    listRooms.innerHTML = nonRoom.join("");
  } else {
    listRooms.innerHTML = htmls.join(""); // có room
  }
}

// handle xử xý thêm room từ dữ liệu từ class html

function handleAddRoom() {
  var btnAdd = document.querySelector("#btn-addroom");

  btnAdd.onclick = function () {
    const nameRoom = document.querySelector('input[name="nameroom"]').value;
    const nameImage = document.querySelector("#image-pre").getAttribute("src");

    if (!nameRoom) {
      alert("Vui lòng không để trống");
    } else {
      var formRoom = {
        name: nameRoom,
        thietbi: [],
        image: nameImage,
      };

      createRoom(formRoom);
    }
  };
}
// info room

function getInfoRoom() {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-agent": "Iot Pannel",
    },
  };
  fetch(roomApi + "/" + id, options)
    .then((res) => res.json())
    .then(callback);
}
// đọc file ảnh rồi chuyển từ ảnh sang mã base64
function handleFileRoom() {
  const preview = document.querySelector("#image-pre");
  const fileImage = document.querySelector("#image-room").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );
  if (fileImage) {
    reader.readAsDataURL(fileImage);
  }
}
