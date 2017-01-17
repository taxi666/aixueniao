(function(){ 

$.fn.extend({ 
	checks_select: function(options){ 
		jq_checks_select = null; 
		$(this).val("---请选择---"); 
		$(this).next().empty(); 
		$(this).unbind("click"); 
		$(this).click(function(e){ 
			jq_check = $(this); 
//jq_check.attr("class", ""); 
			if (jq_checks_select == null) { 
				jq_checks_select = jq_check.next(); 
				jq_checks_select.addClass("checks_div_select"); 
//jq_checks_select = $("<div class='checks_div_select'></div>").insertAfter(jq_check); 
				$.each(options, function(i, n){ 
					check_div=$("<div><label><input class='check_ad' type='checkbox' value='" + n + "' id_no='" + i + "'>" + n + "</label></div>").appendTo(jq_checks_select); 
					check_box=check_div.children(); 
					check_box.click(function(e){ 
//jq_check.attr("value",$(this).attr("value") ); 

						temp="";
						id_no=""; 
						$(this).parents().find("input:checked").each(function(i){ 
							if(i==0){ 
								temp=$(this).val();
								id_no=$(this).attr('id_no');
							}else{ 
								temp+=","+$(this).val();
								id_no+=","+$(this).attr('id_no');
							} 
						}); 
//alert(temp); 
						jq_check.val(temp);
						jq_check.attr('id_no',id_no); 
						e.stopPropagation(); 
					}); 
				}); 
				
				jq_checks_select.show(); 
		}else{ 
			jq_checks_select.toggle(); 

		} 
		e.stopPropagation(); 
	}); 
	$(document).click(function () { 
		flag=$("#test_div"); 
		if(flag.val()==""){ 
			flag.val("---请选择---"); 
		} 
		//jq_checks_select.hide(); 
		$('.checks_div_select').hide();
	}); 
//$(this).blur(function(){ 
//jq_checks_select.css("visibility","hidden"); 
//alert(); 
//}); 
} 
}) 

})(jQuery); 