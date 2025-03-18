$(function() {
    $('#selectDomain').val($("#domain_list option:selected").val());

    $("#domain_list").change(function () {
        let slected = $("#domain_list option:selected").val();
        let selectedDomain = $('#selectDomain');
        if(slected !== "type") {
            selectedDomain.val(slected);
            selectedDomain.attr("disabled","true")
        } else {
            selectedDomain.val("");
            selectedDomain.removeAttr("disabled");
        }
    })
});

function checkId() {

}


