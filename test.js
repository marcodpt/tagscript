import t from './index.js'

QUnit.test("t", function (assert) {
  assert.equal(t('a'), '<a/>')
  assert.equal(t('a', {
    href: 'www.google.com'
  }), '<a href="www.google.com"/>')
  assert.equal(t('a', {
    href: 'www.google.com'
  }, "hello"), '<a href="www.google.com">hello</a>')
  assert.equal(t('a', {
    href: 'www.google.com'
  }, "<span>"), '<a href="www.google.com">&lt;span&gt;</a>')
  assert.equal(t('a', {
    href: 'www.google.com',
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, "<span>"), `<a
  href="www.google.com"
  style="white-space: pre-wrap;"
>&lt;span&gt;</a>`)
  assert.equal(t('a', {
    href: 'www.google.com',
    style: {
      whiteSpace: 'pre-wrap',
      disabled: true,
      active: null,
      width: 0,
      onBlur: false,
      switch: {},
      array: [],
      king: ''
    },
    class: ['', '', ''],
    disabled: true,
    inactive: false,
    user: null,
    dataBind: 3.14,
    array: ['x'],
    object: {'y': 7},
    king: ''
  }, "<span>"), `<a
  href="www.google.com"
  style="
    white-space: pre-wrap;
    disabled: true;
    width: 0;
    on-blur: false;
  "
  disabled
  data-bind="3.14"
  king=""
>&lt;span&gt;</a>`)
  assert.equal(t('div', {}, [
    t('a', {
      href: 'www.google.com',
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, [null, null])
  ]), `<div>
  <a
    href="www.google.com"
    style="white-space: pre-wrap;"
  ></a>
</div>`)
  assert.equal(t('div', {}, [
    t('a', {
      href: 'www.google.com',
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, "White Space\nShould not ident\nIn case of user data")
  ]), `<div>
  <a
    href="www.google.com"
    style="white-space: pre-wrap;"
  >White Space&#13;&#10;Should not ident&#13;&#10;In case of user data</a>
</div>`)
  assert.equal(t('form', {
    class: ['row', 'g-3']
  }, [
    t('div', {
      class: 'col-md-6'
    }, [
      t('label', {
        for: 'inputEmail4',
        class: 'form-label'
      }, 'Email'),
      t('input', {
        type: 'email',
        class: 'form-control',
        id: "inputEmail4"
      })
    ]),
    t('div', {
      class: 'col-md-6'
    }, [
      t('label', {
        for: 'inputPassword4',
        class: 'form-label'
      }, 'Password'),
      t('input', {
        type: 'password',
        class: 'form-control',
        id: "inputPassword4"
      })
    ]),
    t('div', {
      class: 'col-12'
    }, [
      t('label', {
        for: 'inputAddress',
        class: 'form-label'
      }, 'Address'),
      t('input', {
        type: 'text',
        class: 'form-control',
        id: "inputAddress",
        placeholder: "1234 Main St"
      })
    ]),
    t('div', {
      class: 'col-12'
    }, [
      t('label', {
        for: 'inputAddress2',
        class: 'form-label'
      }, 'Address 2'),
      t('input', {
        type: 'text',
        class: 'form-control',
        id: "inputAddress2",
        placeholder: "Apartment, studio, or floor"
      })
    ]),
    t('div', {
      class: 'col-md-6'
    }, [
      t('label', {
        for: 'inputCity',
        class: 'form-label'
      }, 'City'),
      t('input', {
        type: 'text',
        class: 'form-control',
        id: "inputCity"
      })
    ]),
    t('div', {
      class: 'col-md-4'
    }, [
      t('label', {
        for: 'inputState',
        class: 'form-label'
      }, 'State'),
      t('select', {
        id: 'inputState',
        class: 'form-select'
      }, [
        t('option', {
          selected: true
        }, 'Choose...'),
        t('option', {}, '...')
      ])
    ]),
    t('div', {
      class: 'col-md-2'
    }, [
      t('label', {
        for: 'inputZip',
        class: 'form-label'
      }, 'Zip'),
      t('input', {
        type: 'text',
        class: 'form-control',
        id: 'inputZip'
      })
    ]),
    t('div', {
      class: 'col-12'
    }, [
      t('div', {
        class: 'form-check'
      }, [
        t('input', {
          class: 'form-check-input',
          type: 'checkbox',
          id: "gridCheck"
        }),
        t('label', {
          class: 'form-check-label',
          for: 'gridCheck'
        }, 'Check me out')
      ])
    ]),
    t('div', {
      class: 'col-12'
    }, [
      t('button', {
        type: 'submit',
        class: ['btn btn-primary']
      }, 'Sign in')
    ])
  ]), `<form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4"/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input
      type="password"
      class="form-control"
      id="inputPassword4"
    />
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input
      type="text"
      class="form-control"
      id="inputAddress"
      placeholder="1234 Main St"
    />
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input
      type="text"
      class="form-control"
      id="inputAddress2"
      placeholder="Apartment, studio, or floor"
    />
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity"/>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip"/>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="gridCheck"
      />
      <label class="form-check-label" for="gridCheck">Check me out</label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>`)
})

QUnit.test("define tags", function (assert) {
  var tag = t
  assert.equal(t('a', {
    href: 'www.google.com'
  }, 'google!'), `<a href="www.google.com">google!</a>`)
  assert.equal(t('super', {
    href: 'www.google.com'
  }, 'google!'), `<super href="www.google.com">google!</super>`)
  assert.equal(t('hyper', {
    href: 'www.google.com'
  }, 'google!'), `<hyper href="www.google.com">google!</hyper>`)
  assert.equal(t('deep', {
    n: 5,
    tag: "div"
  }, 'Hello'), `<deep n="5" tag="div">Hello</deep>`)

  t = t('super', function (tag, attr, html) {
    return t('div', {
      class: 'super'
    }, [
      t('a', attr, html)
    ])
  })

  assert.equal(t('a', {
    href: 'www.google.com'
  }, 'google!'), `<a href="www.google.com">google!</a>`)
  assert.equal(t('super', {
    href: 'www.google.com'
  }, 'google!'), `<div class="super">
  <a href="www.google.com">google!</a>
</div>`)
  assert.equal(t('hyper', {
    href: 'www.google.com'
  }, 'google!'), `<hyper href="www.google.com">google!</hyper>`)
  assert.equal(t('deep', {
    n: 5,
    tag: "div"
  }, 'Hello'), `<deep n="5" tag="div">Hello</deep>`)

  t = t('hyper', function (tag, attr, html) {
    return t('div', {
      class: 'hyper'
    }, [
      t('super', attr, html)
    ])
  })

  assert.equal(t('a', {
    href: 'www.google.com'
  }, 'google!'), `<a href="www.google.com">google!</a>`)
  assert.equal(t('super', {
    href: 'www.google.com'
  }, 'google!'), `<div class="super">
  <a href="www.google.com">google!</a>
</div>`)
  assert.equal(t('hyper', {
    href: 'www.google.com'
  }, 'google!'), `<div class="hyper">
  <div class="super">
    <a href="www.google.com">google!</a>
  </div>
</div>`)
  assert.equal(t('deep', {
    n: 5,
    tag: "div"
  }, 'Hello'), `<deep n="5" tag="div">Hello</deep>`)

  t = tag('deep', function (tag, attrs, html) {
    if (attrs.n) {
      attrs.n = parseInt(attrs.n) - 1
      return t(attrs.tag || 'span', {}, [
        t('deep', attrs, html)
      ])
    } else {
      return t(attrs.tag || 'span', {}, html)
    }
  })

  assert.equal(t('a', {
    href: 'www.google.com'
  }, 'google!'), `<a href="www.google.com">google!</a>`)
  assert.equal(t('super', {
    href: 'www.google.com'
  }, 'google!'), `<super href="www.google.com">google!</super>`)
  assert.equal(t('hyper', {
    href: 'www.google.com'
  }, 'google!'), `<hyper href="www.google.com">google!</hyper>`)
  assert.equal(t('deep', {
    n: 5,
    tag: "div"
  }, 'Hello'), `<div>
  <div>
    <div>
      <div>
        <div>
          <div>Hello</div>
        </div>
      </div>
    </div>
  </div>
</div>`)
})
