import "./SelectTickets.css";
import BackArrow from "../../../assets/back-arrow.svg";
import ContinueArrow from "../../../assets/continue-arrow.svg";
import WasteBasket from "../../../assets/waste-basket.svg";
import Button from "../../Button/Button";
import {useAccountData} from '../../AccountContext/AccountProvider';

function areAllTicketsCompleted(tickets){
    let atLeastOneName = false
    let pass = true
    tickets.forEach((ticket)=>{
        if(ticket.type==="DEFAULT"){
            pass = false;
            return;
        }
        if(ticket.name!==""){
            atLeastOneName = true
        }
    })
    return (pass && atLeastOneName)
}

function SelectTickets(props) {
    const AccountData = useAccountData()

    const deleteTicket = (id) =>{
        props.changeTicketList(props.ticketList.filter(ticket=>ticket.id!==id))
    }

    const ownerTicketHandler = (value) =>{
        let tempList = [...props.ticketList]
        if(value)
            tempList.unshift({
                owner:true,
                id: AccountData.userData.userId,
                name:AccountData.userData.userName,
                type:null
            })
        else
            tempList.shift()

        props.changeTicketList(tempList)
    }

    const changeTicketDataHandler = (ticket_id,field,value) =>{
        let tempTickets = [...props.ticketList]
        let index = tempTickets.findIndex(ticket => ticket.id===ticket_id)
        tempTickets[index][field] = value
        props.changeTicketList(tempTickets)
    }

    const addTicketHandler = () => {
        let tempList = [...props.ticketList]
        let key = "T-" + new Date().getTime()

        tempList.push({
            owner:false,
            id: key,
            name:"",
            type:"DEFAULT"
        })

        props.changeTicketList(tempList)
    }

    const goBackwardsHandler = () =>{
        props.changeTicketList([])
        props.backwards()
    }

    return (
        <div className="book-page-container">
            {
                props.DBMovie && <h2>{props.DBMovie.movie.title}</h2>
            }

            <h3>Book your tickets</h3>

            <div className="price-list">
                <p>Price list</p>
                <p>Standard ......... 3€</p>
                <p>Child (&lt; 14 years old) ......... 3€</p>
                <p>Student ......... €e</p>
                <p>Pensionary ......... 3€</p>
            </div>

            {
                (AccountData && AccountData.isLoggedIn) &&
                <div>
                    <input type="checkbox" onChange={(e)=>{ownerTicketHandler(e.target.checked)}} id="owner-checkbox"/>
                    <label htmlFor="owner-checkbox">Check this box if there is one ticket for the person who is owning this account</label>
                </div>
            }


            <div className="tickets-container">
                {  props.ticketList.map((ticket,index)=>{
                    return(<div key={ticket.id} className="ticket">
                        {!ticket.owner &&
                            <>
                                <div>
                                    <span>Name:</span>
                                    <input type="text" placeholder={index===0 ? "Mandatory" : "Optional"} onChange={(e)=>{changeTicketDataHandler(ticket.id,"name",e.target.value)}}/>
                                </div>

                                <div>
                                <span>Type:</span>
                                <select type="text" defaultValue={"DEFAULT"} onChange={(e)=>{changeTicketDataHandler(ticket.id,"type",e.target.value)}}>
                                <option value="DEFAULT" disabled style={{color: "black", fontWeight: "bold"}}>Select ticket</option>
                                <option value="standard">Standard</option>
                                <option value="child">Child (&lt;14 y/o)</option>
                                <option value="student">Student</option>
                                <option value="pensionary">Pensionary</option>
                                </select>
                                </div>

                                <img src={WasteBasket} alt="waste-basket" onClick={()=>{deleteTicket(ticket.id)}}/>
                            </>
                        }
                        {
                            ticket.owner &&
                            <div>
                                <span>Name: {ticket.name} (account owner)</span>
                            </div>
                        }

                    </div>)
                })
                }

                <Button text="Add new ticket" event={()=>{addTicketHandler()}}/>
            </div>

            <div className="buttons-container">
                <img src={BackArrow} alt="back-arrow" onClick={goBackwardsHandler}/>
                <img src={ContinueArrow} alt="continue-arrow" className={areAllTicketsCompleted(props.ticketList)? "" : "disabled-book-btn"} onClick={props.forward}/>
            </div>
        </div>
    );
}

export default SelectTickets;
