<?php if(isset($comps_log)) return; ?>

<style>
    .logs {
        padding: 5px;
    }
    .log {
        color: black !important;
        background-color: lightgray;
        border: 1px solid black;
        display: inline-block;
        padding: 5px;
        border-radius: 5px;
        font-weight: 400;
        padding: 5px;
        margin: 5px;
    }
    .log .chain-icon {
        visibility: hidden;
    }
    .log .chain-icon.active {
        visibility: visible;
    }
    .add-log {
        color: green !important;
        background-color: lightgreen;
        border: 1px solid green;
        display: inline-block;
        padding: 5px;
        border-radius: 5px;
        font-weight: 500;
    }
    .add-log:hover {
        color: lightgreen !important;
        background-color: green;
        border: 1px solid lightgreen;
    }
</style>

<!-- General logs container which contains an Add Log -->
<template id="template-logs">
    <div class="add-log clickable"><span class="fa fa-plus"></span>&nbsp;Log</div>
</template>

<!-- Individual log pills -->
<template id="template-log">
    <div class="log">
        &nbsp;
        <span class="date"></span>
        <span class="fa fa-chain chain-icon"></span>
    </div>
</template>


<script src="comps/log.js"></script>

<?php $comps_log=1; ?>