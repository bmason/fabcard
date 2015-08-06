/**
 * Implements hook_locale().
 */
function my_module_locale() {
  // Tell DrupalGap we have Thai translations to load.
  return ['th'];
}

/**
* Implements hook_menu().
*/





function my_module_menu() {
  var items = {};
  items['hello_world'] = {
    title: 'Fab Card',
    page_callback: 'my_module_hello_world_page'
  };
  
    items['coupons'] = {
    title: t('Coupons'),
    page_callback: 'my_module_coupons_page'
  };
  
      items['about'] = {
    title: t('About'),
    page_callback: 'my_module_about_page'
  };
  
  
  items['memberCard'] = {
    title: t('Member Card'),
    page_callback: 'my_module_memberCard_page'
  };
  
    items['set_language/und'] = {
    title: 'Fab Card',
    page_callback: 'set_language_und'
  };
   items['set_language/th'] = {
    title: 'Fab Card',
    page_callback: 'set_language_th'
  };
  return items;
}

function set_language_und() {
	Drupal.settings.language_default='und'; 
	return my_module_hello_world_page();
}

function set_language_th() {
	Drupal.settings.language_default='th'; 
	return my_module_hello_world_page();
}

function my_module_memberCard_page() {
$.ajax({
      url: "http://www.mooyai.com/fcgetprofile/" + Drupal.user.name,
      type: 'post',
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('page_login_submit - failed to login');
      },
      success: function (node) {
//       alert("Loaded " + node.title);
	   
	var theDiv = document.getElementById("memberCard");
	var elm = document.createElement("img");
	elm.src = drupalgap_image_path(node.field_image.und[0].uri);
	theDiv.appendChild(elm);
	elm = document.createElement("br");
	theDiv.appendChild(elm);	
	elm = document.createTextNode(t('Member No') + ': ' + node.field_number.und[0].value);
	theDiv.appendChild(elm);
	elm = document.createElement("br");
	theDiv.appendChild(elm);	
	var d = node.field_expiration.und[0].value.split(' ')[0].split('-');
	elm = document.createTextNode(t('Expy Date') + ': ' + d[2]+'/'+d[1]+'/'+d[0]);
	theDiv.appendChild(elm);
	   
      }
  });
  
     return '<div id="memberCard"></div>'; 
}

function my_module_about_page() {
     return 'Fabcard  0.0.3<br><br>Copyright &#169; Fabcard 2015';	
}	
	


/**
 * The page callback to display the view.
 */
function my_module_coupons_page() {
  try {
    var content = {};
    content['my_coupons_list'] = {
      theme: 'view',
      format: 'ul',
      path: '/coupons', /* the path to the view in Drupal */
      row_callback: 'my_module_coupons_list_row',
      empty_callback: 'my_module_coupons_list_empty',
      attributes: {
        id: 'my_coupons_list_view'
      }
    };
    return content;
  }
  catch (error) { console.log('my_module_coupons_page - ' + error); }
}

/**
 * The row callback to render a single row.
 */
function my_module_coupons_list_row(view, row) {
  try {
    return l(row.title + '<br>' + row.body, 'node/' + row.nid); 
  }
  catch (error) { console.log('my_module_coupons_list_row - ' + error); }
}

/**
 *
 */
function my_module_coupons_list_empty(view) {
  try {
    return 'Sorry, no coupons were found.';
  }
  catch (error) { console.log('my_module_coupons_list_empty - ' + error); }
}


/**
* The callback for the "Hello World" page.
*/
function my_module_hello_world_page() {
  var content = {};
  if (Drupal.user.uid == 0) {content['my_button'] = {
    theme: 'button_link',
    text: t('Login'),
    path: 'user/login'
  };
  content['register'] = {
    theme: 'button',
    text: t('Register with Fab Card'),
    attributes: {
      onclick: "drupalgap_alert(t('Fab Card registration web page'))"
    }
  }}
  else {
	  
  content['memberCard'] = {
  theme: 'button_link',
  text: t('Member Card'),
  path: 'memberCard' 
  }	  
	  
  content['my_button_link'] = {
  theme: 'button_link',
  text: t('View Coupons'),
  path: 'coupons' 
  }

  
  };
  
	if (Drupal.settings.language_default!='und') {
	  drupalgap.settings.menus.regions['header'].links[1].title = 'English';
	  drupalgap.settings.menus.regions['header'].links[1].path = 'set_language/und';
	} else  {
	  drupalgap.settings.menus.regions['header'].links[1].title = 'ภาษาไทย';
	  drupalgap.settings.menus.regions['header'].links[1].path = 'set_language/th';
	};
  return content;
}