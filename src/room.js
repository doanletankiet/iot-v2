//################################################################################################
var roomApi = "http://localhost:3000/rooms";
var deviceApi = "http://localhost:3000/thietbi";
var urlParams = new URLSearchParams(window.location.search); // lấy param từ URL
var devices = urlParams.get("room");
var deviceArray = devices.split(",");
//######################################  render decive at room   ##########################################################

function handleRoute(id) {
  // lấy id của room rồi render thiết bị từ room
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-agent": "Iot Pannel",
    },
  };
  fetch(roomApi + "/" + id + "/" + "thietbi", options)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      document.title = `${data.name}`;
      const listDevices = document.querySelector("#card__iot");
      const nonThietbi = [
        `
      <div class="card " style="width: 18rem; margin-left:15px; margin-right:15px">
      <div class="card-body" style=" text-align: center;">
        <h5 class="card-title">Không có thiết bị</h5>
      </div>
      </div>
    </div> 
      
      `,
      ];
      // từ data file json trả về thì bắt đầu dùng method map lấy từ mảng trong json rồi trả về từng mảng
      const thietbi = data.map((device) => {
        return `
        <div class="card card-item-${device.id}" style="width: 18rem; margin-left:15px; margin-right:15px margin-bottom:15px">
        <div class="img__device">
        <img src="${device.image}" class="card-img-top " id="imge-${device.id}"  height="290px" width="223px" >
        
        </div>
        <div class="card-body">
          <h5 class="card-title">${device.name}</h5>
          <div>
            <input type="${device.type}" class="slider" value="status-input" onclick="handleDevice(${device.id})" id="checkbox-input" />
            <button  onclick="handleDeleteDevice(${device.id})"  class="btn btn-danger btn-delete" style="float: right;">Xóa</button>
          </div>
        </div>
      </div> 
        
        `;
      });
      if (data.length == 0) {
        listDevices.innerHTML = nonThietbi.join("");
      } else {
        listDevices.innerHTML = thietbi.join("");
      }
    });
}
//################################################################################################
// tạo thiết bị từ para data đầu vào
function createDevice(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-agent": "Iot Pannel",
    },
    body: JSON.stringify(data),
  };
  fetch(roomApi + "/" + deviceArray + "/" + "thietbi", options)
    .then((res) => res.json())
    .then(callback);
}
// handler xử lý liên quan tới thêm thiết bị
function handleAddDevice() {
  var btnAddDevice = document.querySelector("#btn-adddivice");

  btnAddDevice.onclick = function () {
    // lắng nghe sự kiện click vào nút thì bắt đầu gửi data về đẻ xử lý
    var nameDecive = document.querySelector('input[name="namedecive"]').value;
    const nameImageDecive = document
      .querySelector("#imagedevie-pre")
      .getAttribute("src");
    if (!nameDecive) {
      alert("Vui lòng không để trống");
    } else {
      var formDecive = {
        name: nameDecive,
        type: "checkbox",
        image: nameImageDecive,
      };
      console.log(formDecive);
      createDevice(formDecive);
    }
  };
}

//################################################################################################
// delete room
function handleDeleteDevice(idDevice) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(deviceApi + "/" + idDevice, options)
    .then((res) => res.json())
    .then(function () {
      handleRoute(deviceArray);
    });
}
//################################################################################################
function onFirebase() {
  //Config firebase
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
}

//handle event device
function handleDevice(data) {
  return data;
}
//################################################################################################

function handleFileDevice() {
  const preview = document.querySelector("#imagedevie-pre");
  const fileDevice = document.querySelector("#image-device").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );
  if (fileDevice) {
    reader.readAsDataURL(fileDevice);
  }
}
function handleDevice(id) {}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Hàm chính xử lý
function start() {
  handleRoute(deviceArray);
  handleAddDevice();
  onFirebase();
}

start();
