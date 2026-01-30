document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    var _base_url = window.location.origin + window.location.pathname.replace(/\/+$/, ''),
        _modules = window.darklgtools_modules || {},
        $menu = document.getElementById('nav-menu'),
        $menu_links = false,
        $modules_content = false,
        $mainContent = document.getElementById('main-content');

    /* ----------------------------------------------------------
  Load module states
---------------------------------------------------------- */

    Object.keys(_modules).forEach(function(module_name) {
        _modules[module_name].loaded = false;
    });

    function _are_all_modules_loaded() {
        return Object.keys(_modules).every(function(module_name) {
            return _modules[module_name].loaded === true;
        });
    }

    function modules_loaded_callback() {
        if (!_are_all_modules_loaded()) {
            return;
        }

        $menu_links = $menu.querySelectorAll('a');
        $modules_content = document.querySelectorAll('.module-content');

        /* Set menu events */
        $menu_links.forEach(function($link) {
            if (window.location.hash === $link.getAttribute('href')) {
                set_menu_link($link);
            }

            $link.addEventListener('click', function() {
                set_menu_link($link);
            });
        });

    }

    /* ----------------------------------------------------------
      Load modules
    ---------------------------------------------------------- */

    Object.keys(_modules).forEach(function(moduleName) {

        /* Build content */
        var moduleContent = document.createElement('div');
        moduleContent.id = 'module-' + moduleName;
        moduleContent.className = 'module-content';
        moduleContent.style.display = 'none';
        moduleContent.innerHTML = '<h2>' + _modules[moduleName].name + '</h2>';

        /* Load module HTML */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _base_url + '/modules/' + moduleName + '/index.html', false);
        xhr.send(null);
        if (xhr.status === 200) {
            moduleContent.innerHTML += xhr.responseText;
            $mainContent.appendChild(moduleContent);

            /* Append link to nav menu */
            var navLink = document.createElement('a');
            navLink.href = '#module-' + moduleName;
            navLink.innerText = _modules[moduleName].name;
            $menu.appendChild(navLink);

            /* Load module */
            var script = document.createElement('script');
            script.src = _base_url + '/modules/' + moduleName + '/script.js';
            document.head.appendChild(script);

            script.onload = function() {
                _modules[moduleName].loaded = true;
                modules_loaded_callback();
            };
        }

    });

    /* ----------------------------------------------------------
      Navigation event
    ---------------------------------------------------------- */


    function set_menu_link(link) {
        $menu_links.forEach(function($link) {
            $link.classList.remove('is-active');
        });
        link.classList.add('is-active');
        var targetId = link.getAttribute('href').substring(1);
        for (var i = 0; i < $modules_content.length; i++) {
            $modules_content[i].style.display = 'none';
        }
        document.getElementById(targetId).style.display = 'block';
    }




});
