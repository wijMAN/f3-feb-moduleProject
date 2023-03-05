let warn = document.getElementById("warn");
let fun1 = () => {
  let naam = document.getElementById("naam").value;
  let mail = document.getElementById("mail").value;
  let pass = document.getElementById("pass").value;
  let cpass = document.getElementById("cpass").value;
  // let warn = document.getElementById("warn");
  // let great = document.getElementById("great");

  // warn.innerText = "";
  // great.innerText = "";

  let reg1 = /^[a-zA-Z]/; //name validation
  let reg2 = /[^a-zA-Z 0-9]/; //these are the only allowed characters, a-z,A-Z,space,0-9 are only allowed
  if (reg1.test(naam) && !reg2.test(naam) && naam.length >= 2) {
    let reg3 = /^([_0-9a-zA-Z]+)@([0-9a-zA-Z]+)\.([a-zA-Z])/; //email-validation
    if (reg3.test(mail)) {
      let reg4 = /[A-Z]/; //password validation //setting up regex for checking characters among A-Z
      let reg5 = /[a-z]/;
      let reg6 = /[0-9]/;
      let reg7 = /[^a-zA-Z0-9]/; //checking for special characters
      if (
        reg4.test(pass) &&
        reg5.test(pass) &&
        reg6.test(pass) &&
        reg7.test(pass) &&
        pass != naam &&
        pass != mail
      ) {
        if (cpass === pass) {
          warn.innerText = ``;
          great.innerText = `Signup Sucessful`;

          let obj = {
            email: mail,
            pass: pass,
            name: naam,
          };

          if (localStorage.getItem("users") == null) {
            let arr = [];
            arr.push(obj);
            // console.log(arr);
            localStorage.setItem("users", JSON.stringify(arr));
          } else {
            let b = JSON.parse(localStorage.getItem("users"));
            b.push(obj);
            localStorage.setItem("users", JSON.stringify(b));
          }
          window.location.assign("login.html");
        } else {
          warn.innerText = `The 2 passwords don't match`;
        }
      } else {
        warn.innerText = `Password must conatain atleast 1 character from A-Z, 1 character from a-z, 1 character from 0-9 & 1 special character, like @,#,$ etc. Also, Password should't be same as name or email`;
      }
    } else {
      warn.innerText = `Email must be in the format "xyz@abc.def". '@' and '.' are the only special characters allowed. Rest characters has to be alpha-numeric only.`;
    }

    // if(mail.){}
  } else {
    warn.innerText = `Name can't be a single letter, it can only start with alphabets, & it can only contain alpha numeric values`;
  }
};

let fun2 = () => {
  if (localStorage.getItem("users") != null) {
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    let a = JSON.parse(localStorage.getItem("users"));
    let flag = true;
    for (const obj of a) {
      let ml = obj["email"];
      let ps = obj["pass"];
      if (ml == mail && ps == pass) {
        great.innerText = `Login Sucessful`;
        let rT = rToken();
        flag = false;
        let obj1 = {
          email: mail,
          pass: pass,
          name: obj["name"],
          token: rT,
        };

        localStorage.setItem("currentUser", JSON.stringify(obj1));

        window.location.assign("dashboard.html");
        break;
      }
    }
    if (flag) {
      warn.innerText = `Wrong user credentials`;
    }
  } else {
    warn.innerText = `Go & Signup first`;
  }
};
let fun3 = () => {
  let opass = document.getElementById("opass").value;
  let npass = document.getElementById("npass").value;
  let cnpass = document.getElementById("cnpass").value;
  let a = JSON.parse(localStorage.getItem("users"));
  let flag = true;
  for (const obj of a) {
    let ps = obj["pass"];
    if (ps == opass) {
      flag = false;

      let reg4 = /[A-Z]/; //password validation //setting up regex for checking characters among A-Z
      let reg5 = /[a-z]/;
      let reg6 = /[0-9]/;
      let reg7 = /[^a-zA-Z0-9]/; //checking for special characters
      if (
        reg4.test(npass) &&
        reg5.test(npass) &&
        reg6.test(npass) &&
        reg7.test(npass)
      ) {
        if (cnpass === npass) {
          warn.innerText = ``;
          great.innerText = `Password changed Sucessfully`;
          obj["pass"] = npass;
          localStorage.setItem("users", JSON.stringify(a));
          fun4();
          // break;
        } else {
          warn.innerText = `The 2 passwords don't match`;
        }
      } else {
        warn.innerText = `New Password must conatain atleast 1 character from A-Z, 1 character from a-z, 1 character from 0-9 & 1 special character, like @,#,$ etc.`;
      }
    }
  }
  if (flag) {
    warn.innerText = `Old password entered is Wrong`;
  }
};
let fun4 = () => {
  localStorage.removeItem("currentUser");
  window.location.assign("login.html");
};

let rToken = () => {
  let s = "qwertyuiopzxcvbnmasdfghjkl0987612345";
  let ans = "";
  for (let i = 0; i < 16; i++) {
    let h = Math.floor(Math.random() * s.length);
    ans += s.charAt(h);
  }
  return ans;
};
