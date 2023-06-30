import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getData() {
    const response = await fetch("http://localhost:5000");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      console.log(response.ok);
      setData(result);
      setError("");
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(response.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 200);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{ele.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p class="card-text">{ele.age}</p>
                <Link to={`/${ele._id}`} class="card-link">
                  Edit
                </Link>

                <a
                  href="#"
                  class="card-link"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
