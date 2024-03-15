const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  const courseId = document.getElementById("courseId").value;
  const taskName = document.getElementById("taskName").value;
  const dueDate = document.getElementById("dueDate").value;
  const details = document.getElementById("details").value;

  e.preventDefault();
  // console.log(courseId, taskName, dueDate, details);

  //to post data
  fetch("https://merninternship.onrender.com/task/create-data", {
    method: "POST",
    body: JSON.stringify({
      courseId,
      taskName,
      dueDate,
      details,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
  alert("Task added Successfully");
  window.location.reload();
});

//to get data
fetch("https://merninternship.onrender.com/task")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);

    const display = document.getElementById("display");
    display.innerHTML = "";

    data.forEach((dat) => {
      const para = document.createElement("p");
      para.setAttribute("data-id", dat._id);
      para.innerHTML = `<h3>CourseId: ${dat.courseId}</h3>
      <p>Task Name: <span>${dat.taskName}</span></p>
      <p>Due Date:<span> ${dat.dueDate}</span></p>
      <p>Details: <span>${dat.details}</span></p>
      <button onclick="editData('${dat._id}')">Edit</button>
      <button onclick="deleteData('${dat._id}')">Delete</button>
      <button class="save_btn" style="display:none;">Save</button>
      <hr/>`;

      display.appendChild(para);
    });
  })
  .catch((error) => console.log(error));

const searchtask = () => {
  fetch("https://merninternship.onrender.com/task")
    .then((res) => res.json())
    .then((data) => {
      const search = document.getElementById("search").value.toLowerCase();
      const display = document.getElementById("display");
      display.innerHTML = "";

      const searchfilter = data.filter((dat) =>
        dat.courseId.toLowerCase().includes(search)
      );
      console.log(searchfilter);

      if (searchfilter.length === 0) {
        display.textContent = "NO TASK FOUND :(";
      } else {
        searchfilter.forEach((result) => {
          const resultElement = document.createElement("p");
          resultElement.innerHTML = `CourseId: ${result.courseId}
              <br>
              Task Name: ${result.taskName}
              <br>
              Due Date: ${result.dueDate}
              <br>
              Details: ${result.details}
              <hr>
            `;
          display.appendChild(resultElement);
        });
      }
    });
};

//to delete data
const deleteData = async (id) => {
  try {
    const response = await fetch(
      `https://merninternship.onrender.com/delete-data/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    // console.log(data);
    alert("Task has been Deleted successfully");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const editData = async (id) => {
  const para = document.querySelector(`p[data-id="${id}"]`);
  const taskdata = para.getElementsByTagName("span");

  for (let i = 0; i < taskdata.length; i++) {
    const currentData = taskdata[i].innerText;
    const input = document.createElement("input");
    input.value = currentData;
    input.style.margin = "0 auto";
    input.style.width = "300px";
    taskdata[i].innerHTML = "";
    taskdata[i].appendChild(input);
  }

  const saveButton = para.querySelector(".save_btn");
  saveButton.style.display = "block";
  saveButton.addEventListener("click", async () => {
    try {
      const updateResponse = await fetch(
        `https://merninternship.onrender.com/task/update-data/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const updateData = await updateResponse.json();
      window.location.reload();
      alert("Error updating task");
    } catch (error) {
      console.error(error);
    }
  });
};

// to show course data
fetch("https://merninternship.onrender.com/course/getcousredata")
  .then((res) => res.json())
  .then((coursedata) => {
    console.log(coursedata);

    const display = document.getElementById("display_course");
    display.innerHTML = "";

    coursedata.forEach((coursedat) => {
      const para = document.createElement("p");
      para.innerHTML = `<h3>CourseId: ${coursedat.courseId}</h3>
      <p><b>Course Name: </b>${coursedat.courseName}</p>
      <p><b>Instructor: </b> ${coursedat.instructor}</p>
      <p><b>Details: </b>${coursedat.details}</p>
      <p><b>Duration: </b>${coursedat.duration}</p>`;

      display.appendChild(para);
    });
  })
  .catch((error) => console.log(error));
