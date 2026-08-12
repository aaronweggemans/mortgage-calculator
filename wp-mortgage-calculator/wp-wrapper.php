<?php
/**
 * Plugin Name: Hypotheek Calculator
 * Description: Hypotheekcalculator ontwikkeld voor WordPress en gemakkelijke support voor Elementor.
 * Version: 1.0.0
 * Author: Aaron Weggemans
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Registreer de Angular JavaScript- en CSS-bestanden.
 */
function jwz_calculator_register_assets(): void
{
  $handle = 'wp-mortgage-calculator';

  $script_path = plugin_dir_path(__FILE__) . 'web-component/web-component.js';
  $style_path = plugin_dir_path(__FILE__) . 'web-component/assets/styles.css';

  $script_url = plugins_url('web-component/web-component.js', __FILE__);
  $style_url = plugins_url('web-component/assets/styles.css', __FILE__);

  if (file_exists($script_path)) {
    wp_register_script($handle . '-script', $script_url, [], (string) filemtime($script_path), true);
  }

  if (file_exists($style_path)) {
    wp_register_style($handle . '-style', $style_url, [], (string) filemtime($style_path));
  }
}

add_action('wp_enqueue_scripts', 'jwz_calculator_register_assets');
add_action('elementor/frontend/after_register_scripts', 'jwz_calculator_register_assets');
add_action('elementor/frontend/after_register_styles', 'jwz_calculator_register_assets');

/**
 * Voeg een eigen JWZ-categorie toe aan de Elementor-zijbalk.
 */
function jwz_calculator_register_category($elements_manager): void {
  $elements_manager->add_category(
    'jwz-widgets',
    [
      'title' => esc_html__('JWZ Widgets', 'jwz-calculator'),
      'icon' => 'fa fa-plug',
    ]
  );
}

add_action('elementor/elements/categories_registered', 'jwz_calculator_register_category');

/**
 * Registreer de Elementor-widget.
 */
function jwz_calculator_register_widget($widgets_manager): void {
  require_once plugin_dir_path(__FILE__) . 'widgets/mortgage-calculator-widget.php';
  $widgets_manager->register(new \JWZ_Mortgage_Calculator_Widget());
}

add_action('elementor/widgets/register', 'jwz_calculator_register_widget');
