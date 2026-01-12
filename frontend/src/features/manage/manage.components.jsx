import Logo from "../../logo"
import { RegisterInputs } from "../auth/Register"

export const NavTop = () => (
  <nav className="top">
    <span className="logo">
        <Logo />
    </span>
    <form>
        <input type="search" placeholder="What are you looking for?"/>
    </form>
    <ul className="links">
        <li><a href="#">FAQ</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Sign Up</a></li>
    </ul>
  </nav>
)

export const NavSub = () => (
  <nav className="sub">
    <ul className="links">
      <li><a href="./users">Users</a></li>
      <li><a href="#">Items</a></li>
      <li><a href="#">Locations</a></li>   
      <li><a href="#">Suppliers</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Transactions</a></li>
    </ul>
  </nav>
)

export const Filter = () => (
  <select id="filter" name="filter">
    <option value="active">Filter by: Active</option>
    <option value="inactive">Filter by: Inactive</option>
    <option value="no-filter" selected>No Filter</option>
  </select>
)

export const Create = ({ children }) => (
  <button id="create" className="btn" href="#">{children}</button>
)

export const SortHeader = ({ children }) => (
  <th>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
    </svg>
    {children}
  </th>
)

export const Modal = ({ children, action }) => (
  <>
    <div class="hide">
    <div id="modal">
      <button id="close">
          <BackArrowIcon />
      </button>
      <header>{children}</header>
          
        <form action={action} id="data" encType="multipart/form-data">
            <fieldset id="file">
                <legend>Profile</legend>
                <UserIcon /> {/* temp image */}
                <input type="file" id="profile" name="profile"/>
            </fieldset>
            <div>
                <fieldset id="info">
                    <legend>Info</legend>
                    <RegisterInputs />
                </fieldset>
                <fieldset>
                    <legend>Status</legend>
                    <label htmlFor="status">Current Status</label>
                    <select id="status" name="status" data-selected="active" required>
                        <option value="active" selected>Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </fieldset>
            </div>
            <div>
                <button type="submit" id="save" className="btn">Save</button>
                <button type="button" id="delete" className="btn">Delete</button>
            </div>
        </form>
      </div>
    </div>
    
  </>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    {/* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
    <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/>
  </svg>
)  

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back back-arrow">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
  </svg>
)