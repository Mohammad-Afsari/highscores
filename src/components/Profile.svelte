<script>
let profile;

const getProfile = (async () => {
    const res = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await res.json();
    profile = data.username.toUpperCase();
})();
</script>

<h2>HI, <span class="authUser">{profile}</span>!</h2>

<style>
.authUser {
    color: orange;
}
</style>
