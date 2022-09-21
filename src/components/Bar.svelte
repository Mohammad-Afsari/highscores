<script>
import {
    navigate
} from "svelte-routing";

const handleLogout = async () => {
    const res = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    if (res.status === 200) {
        navigate('/')
        localStorage.clear();
    }
}
</script>

<div>
    <ul>
        <li>Highscores</li>
        <li id="logout" style="float:right" on:click={handleLogout}>Logout</li>
    </ul>
</div>

    <style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

ul li:first-child {
    color: orange;
}

li {
    float: left;
    cursor: pointer;
}

li:last-child {
    border-right: none;
}

li {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

#logout:hover {
    color: red;
    transition: 0.2s;
}
</style>
