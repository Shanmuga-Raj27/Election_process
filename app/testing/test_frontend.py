import pytest
import os
import re

# This is a structural test file to validate the frontend rendering setup
# as per the Phase 4 testing requirements. 
# Full UI testing would require Playwright/Selenium integration.

def test_evm_guide_component_exists():
    """Verify that the EVMGuide component file exists and is correctly located."""
    file_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'pages', 'EVMGuide.jsx')
    assert os.path.exists(file_path), "EVMGuide.jsx component is missing"

def test_evm_guide_translations_exist():
    """Verify that the English translations for EVM Guide exist."""
    file_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'assets', 'locales', 'en.json')
    assert os.path.exists(file_path), "en.json locale file is missing"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        assert '"evm": {' in content, "EVM translation section is missing"

def test_evm_guide_routing_configured():
    """Verify that the routing for /evm is configured in App.jsx."""
    file_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'App.jsx')
    assert os.path.exists(file_path), "App.jsx is missing"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        assert '<Route path="/evm"' in content, "EVM route is missing in App.jsx"

def test_homepage_evm_button_exists():
    """Verify that the Hero component contains a link to the EVM guide."""
    file_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'components', 'Hero.jsx')
    assert os.path.exists(file_path), "Hero.jsx is missing"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        assert 'to="/evm"' in content, "EVM Guide link is missing in Hero.jsx"
