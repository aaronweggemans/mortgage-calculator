<?php

if (!defined('ABSPATH')) {
  exit;
}

class JWZ_Mortgage_Calculator_Widget extends \Elementor\Widget_Base {
  public function get_name(): string {
    return 'wp-mortgage-calculator';
  }

  public function get_title(): string {
    return esc_html__('Hypotheekcalculator', 'jwz-calculator');
  }

  public function get_icon(): string {
    return 'eicon-calculator';
  }

  public function get_categories(): array {
    return ['jwz-widgets'];
  }

  public function get_keywords(): array {
    return ['hypotheek', 'calculator', 'berekenen', 'jwz'];
  }

  public function get_script_depends(): array {
    return ['wp-mortgage-calculator-script'];
  }

  public function get_style_depends(): array {
    return ['wp-mortgage-calculator-style'];
  }

  protected function register_controls(): void {
    $this->start_controls_section(
      'content_section', [
        'label' => esc_html__('Calculator', 'jwz-calculator'),
        'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_control(
      'heading',
      [
        'label' => esc_html__('Titel', 'jwz-calculator'),
        'type' => \Elementor\Controls_Manager::TEXT,
        'default' => 'Bereken uw hypotheek',
        'placeholder' => 'Vul een titel in',
        'label_block' => true,
      ]
    );

    $this->add_control(
      'theme',
      [
        'label' => esc_html__('Thema', 'jwz-calculator'),
        'type' => \Elementor\Controls_Manager::SELECT,
        'default' => 'light',
        'options' => [
          'light' => 'Licht',
          'dark' => 'Donker',
        ],
      ]
    );

    $this->add_control(
      'primary_color',
      [
        'label' => esc_html__('Primaire kleur', 'jwz-calculator'),
        'type' => \Elementor\Controls_Manager::COLOR,
        'default' => '#315d54',
      ]
    );

    $this->end_controls_section();
  }

  protected function render(): void {
    $settings = $this->get_settings_for_display();
    $theme = esc_attr($settings['theme']);

    printf('<wp-mortgage-calculator theme="%s"></wp-mortgage-calculator>', $theme);
  }

  /**
   * Preview die Elementor direct in de editor kan renderen.
   */
  protected function content_template(): void
  {
    ?>
      <wp-mortgage-calculator theme="{{ settings.theme }}">Calculator laden…</wp-mortgage-calculator>
    <?php
  }
}
