require 'fileutils'

class Build < Thor
    #list of files to be merged
    FILES = [
        "headComments.js",
        "global.js",
        "object.js",
        "container.js",
        "panel.js",
        "button.js",
        "window.js"
    ]

    desc "development", "Merge javascript files from ./src directory into ./library/xkanvas-souce-VERSION.js"
    def development(version)
        version ||= "1.0"
        fileName = "library/xkanvas-source-#{version}.js"
        destTest = "tests/library/xkanvas-source-#{version}.js"

        puts "# Empty folder ./library"
        Dir.foreach("library") do |file|
          if file.match(/.*\.js/)
            File.delete("library/" + file)
          end
        end

        puts "# Creating new source file"
        File.open(fileName, "w") do |file|
            file.puts concatenate(version)
        end 
        puts "# Success!!! :)"
        puts "# Source File Created: #{fileName}"

        FileUtils.cp fileName, destTest
        puts "# Copying to tests environment: #{destTest}"

        includeScript("test.html",fileName,/library.*js/)
        puts "# Including script into: test.html"

        includeScript("tests/xkanvasTests.html",fileName,/library.*js/)
        puts "# Including script into: tests/xkanvasTests.html"
    end

    private
    def includeScript(file2Mod,scriptName,regex)
       content = ""
       content  << IO.read(File.expand_path("#{file2Mod}")) << "\n" 
       content.sub!(regex, scriptName)

       File.open(file2Mod, "w") do |file|
           file.puts content
       end
    end

    private
    def concatenate(version)
      date ||= Time.now.strftime("%b %d %Y")
      content = ""
      FILES.each do |file|
        content << IO.read(File.expand_path("src/#{file}")) << "\n"
      end
      
      # Add the version number and date
      content.sub!("XXversionXX", version)
      content.sub!("'XXversionXX'", "'#{version}'")
      content.sub!("XXdateXX", date)
      
      return content
    end
end
