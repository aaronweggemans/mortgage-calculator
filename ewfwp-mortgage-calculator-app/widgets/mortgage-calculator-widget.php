<?php

if (!defined('ABSPATH')) {
  exit;
}

class JWZ_Mortgage_Calculator_Widget extends \Elementor\Widget_Base {
  public function get_name(): string {
    return 'ewfwp-mortgage-calculator-app';
  }

  public function get_title(): string {
    return esc_html__('Hypotheekcalculator', 'ewfwp-mortgage-calculator');
  }

  public function get_icon(): string {
    return 'eicon-site-identity';
  }

  public function get_categories(): array {
    return ['jwz-widgets'];
  }

  public function get_keywords(): array {
    return ['hypotheek', 'calculator', 'berekenen', 'jwz'];
  }

  public function get_script_depends(): array {
    return ['ewfwp-mortgage-calculator-app-script'];
  }

  public function get_style_depends(): array {
    return ['ewfwp-mortgage-calculator-app-style'];
  }

  protected function register_controls(): void {
    $this->start_controls_section(
      'content_section', [
        'label' => esc_html__('Calculator', 'ewfwp-mortgage-calculator'),
        'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_control(
      'theme',
      [
        'label' => esc_html__('Thema', 'ewfwp-mortgage-calculator'),
        'type' => \Elementor\Controls_Manager::SELECT,
        'default' => 'A',
        'options' => [
          'A' => 'Thema 1',
          'B' => 'Thema 2',
        ],
      ]
    );

    $this->add_control(
      'primary_color',
      [
        'label' => esc_html__('Primaire kleur', 'ewfwp-mortgage-calculator'),
        'type' => \Elementor\Controls_Manager::COLOR,
        'default' => '#315d54',
      ]
    );

    $this->add_control(
      'secondary_color',
      [
        'label' => esc_html__('Secundaire kleur', 'ewfwp-mortgage-calculator'),
        'type' => \Elementor\Controls_Manager::COLOR,
        'default' => '#315d54',
      ]
    );

    $this->end_controls_section();
  }

  protected function render(): void {
    $settings = $this->get_settings_for_display();
    $theme = esc_attr($settings['theme']);
    $primaryColor = esc_attr($settings['primary_color']);
    $secondaryColor = esc_attr($settings['secondary_color']);

    printf(
      '<ewfwp-mortgage-calculator-app option="%s" primaryColor="%s" secondaryColor="%s"></ewfwp-mortgage-calculator-app>',
      $theme, $primaryColor, $secondaryColor
    );
  }

  /**
   * Preview die Elementor direct in de editor kan renderen.
   */
  protected function content_template(): void
  {
    ?>
      <ewfwp-mortgage-calculator-app
        option="{{ settings.theme }}"
        primaryColor="{{ settings.primary_color }}"
        secondaryColor="{{ settings.secondary_color }}"
      >Calculator laden…</ewfwp-mortgage-calculator-app>
    <?php
  }
}
