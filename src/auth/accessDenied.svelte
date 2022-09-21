<script>
import {
    Link
} from 'svelte-routing';

import {
    link
} from 'svelte-routing';
</script>

<div class="noAccessContainer">
    <h1>Sorry, no access.</h1>
    <h2>
        Go back to <a href='/' class='link' use:link>Home page</a>.
    </h2>
</div>

<style>
a {
    color: orange;
}

.noAccessContainer {
    width: 50%;
    margin: 200px auto;
    text-align: center;
    color: whitesmoke;
    text-decoration: none;

}
</style>
