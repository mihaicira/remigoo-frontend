import "./TicketInfo.css";
import {Link} from "react-router-dom";

function TicketInfo(props) {
    return (
        <div className="account-section">
            <h2>Following tickets</h2>
            <ul>
                <li><a href="test">The salinger year (2020)</a> (drama,1h 41m) | 15 June, 18:40;</li>
                <li><a href="test">The salinger year (2020)</a> (drama,1h 41m) | 15 June, 18:40;</li>
                <li><a href="test">The salinger year (2020)</a> (drama,1h 41m) | 15 June, 18:40;</li>
            </ul>
            <p className="account-section-nothing-here">There are no following tickets. Book your tickets <Link to="/">here</Link>.</p>

            <h2>All your tickets</h2>
            <ul>
                <li><a href="test">The salinger year (2020)</a> (drama,1h 41m) | 15 June, 18:40;</li>
                <li><a href="test">The salinger year (2020)</a> (drama,1h 41m) | 15 June, 18:40;</li>
                <li><a href="test">The salinger year (2020)</a> (drama,1h 41m) | 15 June, 18:40;</li>
            </ul>
            <p className="account-section-nothing-here">It looks like you didn’t buy any tickets using this account. Start your journey <Link to="/">here</Link>!</p>
        </div>

    );
}

export default TicketInfo;
