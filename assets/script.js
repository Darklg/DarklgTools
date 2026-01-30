document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    var _base_url = window.location.origin + window.location.pathname.replace(/\/+$/, ''),
        _modules = window.darklgtools_modules || {},
        $menu = document.getElementById('nav-menu'),
        $mainContent = document.getElementById('main-content');

    /* ----------------------------------------------------------
  Initialize module states
---------------------------------------------------------- */

    Object.keys(_modules).forEach(function(module_name) {
        _modules[module_name].loaded = false;
        _modules[module_name].loading = false;
    });

    /* ----------------------------------------------------------
      Build navigation menu
    ---------------------------------------------------------- */

    Object.keys(_modules).forEach(function(moduleName) {
        /* Append link to nav menu */
        var navLink = document.createElement('a');
        navLink.href = '#module-' + moduleName;
        navLink.innerText = _modules[moduleName].name;
        navLink.setAttribute('data-module', moduleName);
        $menu.appendChild(navLink);
    });

    /* ----------------------------------------------------------
      Lazy load module function
    ---------------------------------------------------------- */

    function loadModule(moduleName, callback) {
        /* Skip if already loaded or loading */
        if (_modules[moduleName].loaded || _modules[moduleName].loading) {
            if (callback && _modules[moduleName].loaded) {
                callback();
            }
            return;
        }

        _modules[moduleName].loading = true;

        /* Build content container */
        var moduleContent = document.createElement('div');
        moduleContent.id = 'module-' + moduleName;
        moduleContent.className = 'module-content';
        moduleContent.style.display = 'none';
        moduleContent.innerHTML = '<h2>' + _modules[moduleName].name + '</h2><div class="loading">Loading...</div>';
        $mainContent.appendChild(moduleContent);

        /* Load module HTML asynchronously */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _base_url + '/modules/' + moduleName + '/index.html', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                moduleContent.innerHTML = '<h2>' + _modules[moduleName].name + '</h2>' + xhr.responseText;

                /* Load module script */
                var script = document.createElement('script');
                script.src = _base_url + '/modules/' + moduleName + '/script.js';
                document.head.appendChild(script);

                script.onload = function() {
                    _modules[moduleName].loaded = true;
                    _modules[moduleName].loading = false;
                    if (callback) {
                        callback();
                    }
                };
            }
        };
        xhr.send(null);
    }

    /* ----------------------------------------------------------
      Navigation event
    ---------------------------------------------------------- */

    function showModule(moduleName) {
        /* Hide all modules */
        var allModules = document.querySelectorAll('.module-content');
        for (var i = 0; i < allModules.length; i++) {
            allModules[i].style.display = 'none';
        }

        /* Show target module */
        var targetModule = document.getElementById('module-' + moduleName);
        if (targetModule) {
            targetModule.style.display = 'block';
        }
    }

    function setActiveLink(moduleName) {
        var menuLinks = $menu.querySelectorAll('a');
        menuLinks.forEach(function($link) {
            $link.classList.remove('is-active');
            if ($link.getAttribute('data-module') === moduleName) {
                $link.classList.add('is-active');
            }
        });
    }

    /* Set menu events */
    var menuLinks = $menu.querySelectorAll('a');
    menuLinks.forEach(function($link) {
        $link.addEventListener('click', function(e) {
            e.preventDefault();
            var moduleName = $link.getAttribute('data-module');
            
            /* Update URL hash */
            window.location.hash = $link.getAttribute('href');
            
            /* Load module if not loaded */
            loadModule(moduleName, function() {
                showModule(moduleName);
                setActiveLink(moduleName);
            });
            
            /* If already loaded, just show it */
            if (_modules[moduleName].loaded) {
                showModule(moduleName);
                setActiveLink(moduleName);
            }
        });
    });

    /* Handle initial hash on page load */
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        var moduleName = hash.replace('module-', '');
        if (_modules[moduleName]) {
            loadModule(moduleName, function() {
                showModule(moduleName);
                setActiveLink(moduleName);
            });
        }
    }

});
