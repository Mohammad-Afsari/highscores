<script>
import {
    Router,
    Link,
    Route
} from "svelte-routing";
import ProtectedRoute from "./auth/ProtectedRoute.svelte";
import Login from './components/Login.svelte'
import Dashboard from "./components/Dashboard.svelte";

export let url = "";
</script>

<main>
    <Router url="{url}">
        <div>
            <Route path="/"><Login /></Route>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
        </div>
    </Router>
</main>
