import "./Information.css";

function Information() {
    return (
        <div className="information section">
            <h1>Information</h1>

            <h2>Contact</h2>
            <span>Call: </span><a href="tel:0736333333">0736 333 333</a>
            <br/>
            <span>Email: </span><a href="mailto:mihai.cira00@e-uvt.ro">remigoo@contact.com</a>
            <hr/>

            <h2>Adress</h2>
            <span>Location: </span><span className="text">Bulevardul Vasile Pârvan 4, Timișoara 300223</span>
            <br/><br/>

            <iframe title="remigoo_location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.2006506443195!2d21.229426515760117!3d45.74712322254084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff24d29f192!2sUniversitatea%20de%20Vest%20din%20Timi%C8%99oara!5e0!3m2!1sro!2sro!4v1636663106229!5m2!1sro!2sro"
                 allowFullScreen="" loading="lazy"></iframe>

            <hr/>
            <h2>Schedule</h2>

            <span>Monday: </span><span className="text">8 AM - 1:30 AM</span><br/>
            <span>Tuesday: </span><span className="text">8 AM - 1:30 AM</span><br/>
            <span>Wednesday: </span><span className="text">8 AM - 1:30 AM</span><br/>
            <span>Thursday: </span><span className="text">8 AM - 1:30 AM</span><br/>
            <span>Friday: </span><span className="text">8 AM - 1:30 AM</span><br/>
            <span>Saturday: </span><span className="text">8 AM - 1:30 AM</span><br/>
            <span>Sunday: </span><span className="text">8 AM - 1:30 AM</span><br/>

        </div>
    );
}

export default Information;
