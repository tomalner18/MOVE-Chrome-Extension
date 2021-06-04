import unittest
import pathlib as pl

class TestCaseBase(unittest.TestCase):
    def assertIsFile(self, path):
        if not pl.Path(path).resolve().is_file():
            raise AssertionError("\n File does not exist: %s. This file should be present to allow deployment to Chrome Web Store" % str(path))

class ReadMeIsInDirectory(TestCaseBase):
    def test(self):
        path = pl.Path.cwd() / 'README.md'
        self.assertIsFile(path)

class ManifestIsInDirectory(TestCaseBase):
    def test(self):
        path = pl.Path.cwd() / 'src/manifest.json'
        self.assertIsFile(path)

class PopupPageIsInDirectory(TestCaseBase):
    def test(self):
        path = pl.Path.cwd() / 'src/popup.html'
        self.assertIsFile(path)

if __name__ == "__main__":
    unittest.main(verbosity=2)
