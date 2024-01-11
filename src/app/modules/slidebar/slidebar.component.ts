import { Component, OnInit } from '@angular/core';
import $ from 'jquery'; // Import the $ symbol from the 'jquery' module

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css', '../../../assets/css/app.main.css']
})
export class SlidebarComponent implements OnInit {

  ngOnInit() {
    // Lógica de inicialización, si es necesario
  }

  ngAfterViewInit() {
    this.setupPage();
  }

  setupPage() {
    "use strict";

    // Options
    const submenu_animation_speed: number = 100;
    const submenu_opacity_animation: boolean = true; // set to "false" to remove opacity animation
    const page_boxed: boolean = false;
    const page_sidebar_fixed: boolean = true;
    const page_sidebar_collapsed: boolean = false;
    const page_header_fixed: boolean = false;

    // Elements
    const body: JQuery<HTMLElement> = $('body');
    const page_header: JQuery<HTMLElement> = $('.page-header');
    const page_sidebar: JQuery<HTMLElement> = $('.page-sidebar');
    const page_content: JQuery<HTMLElement> = $('.page-content');

    // Boxed Page
    const boxed_page = (): void => {
      if (page_boxed === true) {
        $('.page-container').addClass('container');
      }
    };

    // Fixed Header
    const fixed_header = (): void => {
      if (page_header_fixed === true) {
        $('body').addClass('page-header-fixed');
      }
    };

    // Sidebar
    const page_sidebar_init = (): void => {
      // Slimscroll
      $('.page-sidebar-inner').slimScroll({
        height: '100%'
      }).mouseover();

      // Fixed Sidebar
      const fixed_sidebar = (): void => {
        if ((body.hasClass('page-sidebar-fixed')) && (page_sidebar_fixed === false)) {
          page_sidebar_fixed = true;
        }

        if (page_sidebar_fixed === true) {
          body.addClass('page-sidebar-fixed');
          $('#fixed-sidebar-toggle-button').removeClass('icon-radio_button_unchecked');
          $('#fixed-sidebar-toggle-button').addClass('icon-radio_button_checked');
        }

        const fixed_sidebar_toggle = (): void => {
          body.toggleClass('page-sidebar-fixed');
          if (body.hasClass('page-sidebar-fixed')) {
            page_sidebar_fixed = true;
          } else {
            page_sidebar_fixed = false;
          }
        };

        $('#fixed-sidebar-toggle-button').on('click', () => {
          fixed_sidebar_toggle();
          $(this).toggleClass('icon-radio_button_unchecked');
          $(this).toggleClass('icon-radio_button_checked');
          return false;
        });
      };

      // Collapsed Sidebar
      const collapsed_sidebar = (): void => {
        if (page_sidebar_collapsed === true) {
          body.addClass('page-sidebar-collapsed');
        }

        const collapsed_sidebar_toggle = (): void => {
          body.toggleClass('page-sidebar-collapsed');
          if (body.hasClass('page-sidebar-collapsed')) {
            page_sidebar_collapsed = true;
          } else {
            page_sidebar_collapsed = false;
          }

          $('.page-sidebar-collapsed .page-sidebar .accordion-menu').on({
            mouseenter: function () {
              $('.page-sidebar').addClass('fixed-sidebar-scroll');
            },
            mouseleave: function () {
              $('.page-sidebar').removeClass('fixed-sidebar-scroll');
            }
          }, 'li');
        };

        $('.page-sidebar-collapsed .page-sidebar .accordion-menu').on({
          mouseenter: function () {
            $('.page-sidebar').addClass('fixed-sidebar-scroll');
          },
          mouseleave: function () {
            $('.page-sidebar').removeClass('fixed-sidebar-scroll');
          }
        }, 'li');

        $('#collapsed-sidebar-toggle-button').on('click', () => {
          collapsed_sidebar_toggle();
          return false;
        });
      };

      const small_screen_sidebar = (): void => {
        $('#sidebar-toggle-button').on('click', () => {
          body.toggleClass('page-sidebar-visible');
          return true;
        });
        $('#sidebar-toggle-button-close').on('click', () => {
          body.toggleClass('page-sidebar-visible');
          return true;
        });
      };

      fixed_sidebar();
      collapsed_sidebar();
      small_screen_sidebar();
    };

    // Accordion menu
    const accordion_menu = (): void => {
      const select_sub_menus: JQuery<HTMLElement> = $('.page-sidebar li:not(.open) .sub-menu');
      const active_page_sub_menu_link: JQuery<HTMLElement> = $('.page-sidebar li.active-page > a');

      // Hide all sub-menus
      select_sub_menus.hide();

      if (submenu_opacity_animation === false) {
        $('.sub-menu li').each(function (i) {
          $(this).addClass('animation');
        });
      }

      // Accordion
      $('.accordion-menu').on('click', 'a', function () {
        const sub_menu: JQuery<HTMLElement> = $(this).next('.sub-menu');
        const parent_list_el: JQuery<HTMLElement> = $(this).parent('li');
        const active_list_element: JQuery<HTMLElement> = $('.accordion-menu > li.open');

        const show_sub_menu = (): void => {
          sub_menu.slideDown(submenu_animation_speed);
          parent_list_el.addClass('open');
          if (submenu_opacity_animation === true) {
            $('.open .sub-menu li').each(function (i) {
              const t: JQuery<HTMLElement> = $(this);
              setTimeout(() => { t.addClass('animation'); }, (i + 1) * 15);
            });
          }
        };

        const hide_sub_menu = (): void => {
          if (submenu_opacity_animation === true) {
            $('.open .sub-menu li').each(function (i) {
              const t: JQuery<HTMLElement> = $(this);
              setTimeout(() => { t.removeClass('animation'); }, (i + 1) * 5);
            });
          }
          sub_menu.slideUp(submenu_animation_speed);
          parent_list_el.removeClass('open');
        };

        const hide_active_menu = (): void => {
          $('.accordion-menu > li.open > .sub-menu').slideUp(submenu_animation_speed);
          active_list_element.removeClass('open');
        };

        if ((sub_menu.length) && (!body.hasClass('page-sidebar-collapsed'))) {

          if (!parent_list_el.hasClass('open')) {
            if (active_list_element.length) {
              hide_active_menu();
            }
            show_sub_menu();
          } else {
            hide_sub_menu();
          }

          return false;
        }
        if ((sub_menu.length) && (body.hasClass('page-sidebar-collapsed'))) {
          return false;
        }
      });

      if ($('.active-page > .sub-menu').length) {
        active_page_sub_menu_link.click();
      }
    };

    page_sidebar_init();
    boxed_page();
    accordion_menu();
  }
}

// Collapsed Sidebar (min-width:992px) and (max-width: 1199px)
$(() => {
  'use strict';

  const mql: MediaQueryList = window.matchMedia('(min-width:992px) and (max-width: 1199px)');

  const doMinimize = (e: MediaQueryListEvent): void => {
    if (e.matches) {
      $('body').addClass('page-sidebar-collapsed');
    } else {
      $('body').removeClass('page-sidebar-collapsed');
    }
  };

  mql.addListener(doMinimize);
  doMinimize(mql);
});
