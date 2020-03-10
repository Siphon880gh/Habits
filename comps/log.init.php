<!-- Log -->

<style>
    .color0 {
        border-top-color: purple !important;
    }
    .color1 {
        border-top-color: red !important;
    }
    .color2 {
        border-top-color: blue !important;
    }
    .color3 {
        border-top-color: green !important;
    }
    .color4 {
        border-top-color: orange !important;
    }

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
        margin: 7.5px;
        position: relative;
    }
    .log:hover {
        /* background-color: #ffbbbb; */
        opacity: .75;
    }
    .log .chain-icon {
        visibility: hidden;
        position: absolute;
        top: 10px;
        right: -13.5px;
        font-size: 10px;
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
        margin: 7.5px;
        border-radius: 5px;
        font-weight: 500;
    }
    .add-log:hover {
        color: lightgreen !important;
        background-color: green;
        border: 1px solid lightgreen;
    }
</style>

<!-- Individual log pills -->
<template id="template-log">
    <div class="log clickable" data-unix>
        &nbsp;
        <span class="date"></span>
        <span class="fa fa-chain chain-icon"></span>
    </div>
</template>


<script src="comps/log.js"></script>