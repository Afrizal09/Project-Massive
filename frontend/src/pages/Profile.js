import React, { Fragment, useState, useEffect } from "react";
import axios from "axios"; // Import library Axios

function Profile() {
  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    email: "",
    company: "",
    profileImage: "",
    // ... tambahkan field lainnya sesuai kebutuhan
  });

  const [imageFile, setImageFile] = useState(null); // State untuk menyimpan file gambar yang diupload

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profil1");
      const profile = response.data[0];

      // Menangani nilai null dari database
      const updatedProfile = {
        username: profile.username || "",
        name: profile.name || "",
        email: profile.email || "",
        company: profile.company || "",
        profileImage: profile.profileImage || "", // Menambahkan field untuk gambar
        // ... tambahkan field lainnya sesuai kebutuhan
      };

      setProfileData(updatedProfile);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const saveChanges = async () => {
    try {
      console.log("Saving changes...");

      const formData = new FormData();
      formData.append("profileImage", imageFile);

      // Menambahkan data profil lainnya ke FormData
      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:5000/profil1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Changes saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Fragment>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Profile</title>
      <link rel="stylesheet" href="profile.css" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      ></link>
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a
                  className="list-group-item list-group-item-action active"
                  data-toggle="list"
                  href="#account-general"
                >
                  General
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-change-password"
                >
                  Change password
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-info"
                >
                  Info
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-social-links"
                >
                  Social links
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-connections"
                >
                  Connections
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-notifications"
                >
                  Notifications
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="account-general">
                  <div className="card-body media align-items-center">
                    <img
                      src={
                        profileData.profileImage ||
                        "https://bootdey.com/img/Content/avatar/avatar1.png"
                      }
                      alt=""
                      className="d-block ui-w-80"
                    />
                    <div className="media-body ml-4">
                      <label className="btn btn-outline-primary">
                        Upload new photo
                        <input
                          type="file"
                          className="account-settings-fileinput"
                          onChange={handleImageChange}
                        />
                      </label>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-default md-btn-flat"
                      >
                        Reset
                      </button>
                      <div className="text-light small mt-1">
                        Allowed JPG, GIF, or PNG. Max size of 800K
                      </div>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={profileData.username}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                      <div className="alert alert-warning mt-3">
                        Your email is not confirmed. Please check your inbox.
                        <br />
                        <a href="javascript:void(0)">Resend confirmation</a>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-change-password">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-info">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus."
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Birthday</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="May 3, 1995"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <select className="custom-select">
                        <option>USA</option>
                        <option selected="">Canada</option>
                        <option>UK</option>
                        <option>Germany</option>
                        <option>France</option>
                      </select>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body pb-2">
                    <h6 className="mb-4">Contacts</h6>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="+0 (123) 456 7891"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Website</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-social-links">
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Twitter</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="https://twitter.com/user"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Facebook</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="https://www.facebook.com/user"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Google+</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Instagram</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="https://www.instagram.com/user"
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-connections">
                  <div className="card-body">
                    <button type="button" className="btn btn-twitter">
                      Connect to
                      <strong>Twitter</strong>
                    </button>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <h5 className="mb-2">
                      <a
                        href="javascript:void(0)"
                        className="float-right text-muted text-tiny"
                      >
                        <i className="ion ion-md-close" /> Remove
                      </a>
                      <i className="ion ion-logo-google text-google" />
                      You are connected to Google:
                    </h5>
                    <a
                      href="/cdn-cgi/l/email-protection"
                      className="__cf_email__"
                      data-cfemail="f9979498818e9c9595b994989095d79a9694"
                    >
                      [email&nbsp;protected]
                    </a>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <button type="button" className="btn btn-facebook">
                      Connect to
                      <strong>Facebook</strong>
                    </button>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <button type="button" className="btn btn-instagram">
                      Connect to
                      <strong>Instagram</strong>
                    </button>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-notifications">
                  <div className="card-body pb-2">
                    <h6 className="mb-4">Activity</h6>
                    <div className="form-group">
                      <label className="switcher">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          defaultChecked=""
                        />
                        <span className="switcher-indicator">
                          <span className="switcher-yes" />
                          <span className="switcher-no" />
                        </span>
                        <span className="switcher-label">
                          Email me when someone comments on my article
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          defaultChecked=""
                        />
                        <span className="switcher-indicator">
                          <span className="switcher-yes" />
                          <span className="switcher-no" />
                        </span>
                        <span className="switcher-label">
                          Email me when someone answers on my forum thread
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" />
                        <span className="switcher-indicator">
                          <span className="switcher-yes" />
                          <span className="switcher-no" />
                        </span>
                        <span className="switcher-label">
                          Email me when someone follows me
                        </span>
                      </label>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body pb-2">
                    <h6 className="mb-4">Application</h6>
                    <div className="form-group">
                      <label className="switcher">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          defaultChecked=""
                        />
                        <span className="switcher-indicator">
                          <span className="switcher-yes" />
                          <span className="switcher-no" />
                        </span>
                        <span className="switcher-label">
                          News and announcements
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" />
                        <span className="switcher-indicator">
                          <span className="switcher-yes" />
                          <span className="switcher-no" />
                        </span>
                        <span className="switcher-label">
                          Weekly product updates
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          defaultChecked=""
                        />
                        <span className="switcher-indicator">
                          <span className="switcher-yes" />
                          <span className="switcher-no" />
                        </span>
                        <span className="switcher-label">
                          Weekly blog digest
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveChanges}
          >
            Save Changes
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-default"
            onClick={() => (window.location.href = "UserLogIn.html")}
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
