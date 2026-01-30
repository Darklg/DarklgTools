document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    var _base_url = window.location.origin + window.location.pathname.replace(/\/+$/, ''),
        _modules = window.darklgtools_modules || {},
        $menu = document.getElementById('nav-menu'),
        $menu_links = false,
        $modules_content = false,
        $mainContent = document.getElementById('main-content');

    /* ----------------------------------------------------------
      Menu
    ---------------------------------------------------------- */

    /* Build main menu */
    Object.keys(_modules).forEach(function(moduleName) {
        var navLink = document.createElement('a');
        navLink.href = '#module-' + moduleName;
        navLink.innerText = _modules[moduleName].name;
        $menu.appendChild(navLink);
    });

    $menu_links = $menu.querySelectorAll('a');
    $menu_links.forEach(function($link) {
        if (window.location.hash === $link.getAttribute('href')) {
            set_menu_item($link);
        }

        $link.addEventListener('click', function() {
            set_menu_item($link);
        });
    });

    function set_menu_item(link) {
        $menu_links.forEach(function($link) {
            $link.classList.remove('is-active');
        });
        link.classList.add('is-active');
        var targetId = link.getAttribute('href').substring(1);
        var moduleName = targetId.replace('module-', '');
        load_module(moduleName);
    }

    /* Helpers */
    function hide_all_modules() {
        $modules_content = document.querySelectorAll('.module-content');
        for (var i = 0; i < $modules_content.length; i++) {
            $modules_content[i].style.display = 'none';
        }
    }

    function display_module(moduleName) {
        var targetId = 'module-' + moduleName;
        document.getElementById(targetId).style.display = 'block';
    }

    /* ----------------------------------------------------------
      Load a module
    ---------------------------------------------------------- */

    function load_module(moduleName) {
        if (_modules[moduleName].loaded) {
            hide_all_modules();
            display_module(moduleName);
            return;
        }

        /* Build content */
        var moduleContent = document.createElement('div');
        moduleContent.id = 'module-' + moduleName;
        moduleContent.className = 'module-content';
        moduleContent.innerHTML = '<h2>' + _modules[moduleName].name + '</h2>';

        /* Load module HTML */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _base_url + '/modules/' + moduleName + '/index.html', false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE || xhr.status !== 200) {
                return;
            }

            hide_all_modules();
            moduleContent.innerHTML += xhr.responseText;
            $mainContent.appendChild(moduleContent);

            /* Load module */
            var script = document.createElement('script');
            script.src = _base_url + '/modules/' + moduleName + '/script.js';
            document.head.appendChild(script);

            script.onload = function() {
                _modules[moduleName].loaded = true;
            };
        }
        xhr.send(null);

    }

});
